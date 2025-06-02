import datetime
import re
import requests
from typing import List, Dict, Union
from app2.google_calendar import get_calendar_service

def build_post_prompt(entry: dict) -> str:
    return f"""
You are a social media copywriter.

Generate a {entry['content_type']} for {entry['platform']} based on the following strategy:

Title: {entry['title']}
CTA: {entry['call_to_action']}
Pillar: {entry['pillar']}
Platform: {entry['platform']}
Hashtags: {" ".join(entry['hashtags'])}

The output should match the content type and platform format. Keep it engaging, concise, and CTA-driven.
"""

def extract_calendar_for_approval(content: str) -> List[Dict[str, Union[str, Dict]]]:
    lines = content.splitlines()
    extracting = False
    calendar_lines = []

    for line in lines:
        line = line.strip()
        if not extracting and "30-Day Content Calendar" in line:
            extracting = True
            continue
        if extracting:
            if line.startswith("##") and "30-Day Content Calendar" not in line:
                break
            calendar_lines.append(line)

    week_pattern = re.compile(r"\*\*Week\s*(\d+):\s*([^\n]*)\*\*", re.IGNORECASE)
    day_pattern = re.compile(r"\*\*Day\s*(\d+)\s*\(([^)]+)\):\*\*\s*\"(.+?)\" \(([^)]+)\) - CTA: (.+)", re.IGNORECASE)
    field_pattern = re.compile(r"\*\*(\w+):\*\*\s*(.*)")

    calendar = []
    current_week = ""
    current_day = {}

    for line in calendar_lines:
        week_match = week_pattern.match(line)
        if week_match:
            current_week = f"Week {week_match.group(1)}: {week_match.group(2).strip()}"
            continue

        day_match = day_pattern.match(line)
        if day_match:
            if current_day:
                calendar.append(current_day)
            day_num, platform, title, content_type, cta = day_match.groups()
            current_day = {
                "week": current_week,
                "day": f"Day {day_num}",
                "title": title,
                "raw_data": {
                    "Platform": platform,
                    "Type": content_type,
                    "CTA": cta
                }
            }
            continue

        if current_day:
            field_match = field_pattern.match(line)
            if field_match:
                key, val = field_match.groups()
                current_day["raw_data"][key] = val.strip()

    if current_day:
        calendar.append(current_day)

    return calendar


def schedule_approved_posts(
    posts: List[Dict],
    start_date: str,
    calendar_id: str = "primary",
    default_reminders: bool = True
) -> Dict:

    try:
        start_date_dt = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
    except ValueError:
        return {
            "count": 0,
            "start_date": start_date,
            "status": "failed",
            "error": "Invalid start_date format. Use YYYY-MM-DD",
            "calendar_data": None
        }

    service = get_calendar_service()
    count = 0
    errors = []

    for i, entry in enumerate(posts):
        try:
            event_date = start_date_dt + datetime.timedelta(days=i)
            event = {
                'summary': entry.get("title", "Untitled Post"),
                'description': entry.get("content", ""),
                'start': {
                    'date': event_date.isoformat(),
                    'timeZone': 'America/New_York'
                },
                'end': {
                    'date': event_date.isoformat(),
                    'timeZone': 'America/New_York'
                },
                'reminders': {
                    'useDefault': default_reminders
                },
                'extendedProperties': {
                    'private': {
                        'week': entry.get("week", ""),
                        **entry.get("raw_data", {})
                    }
                }
            }

            service.events().insert(
                calendarId=calendar_id,
                body=event
            ).execute()
            count += 1
        except Exception as e:
            errors.append(f"{entry.get('day', f'Day {i + 1}')}: {str(e)}")

    return {
        "count": count,
        "start_date": start_date,
        "status": "success" if count == len(posts) else "partial",
        "errors": errors if errors else None,
        "calendar_data": posts if count > 0 else None
    }
