from fastapi import FastAPI, Body, HTTPException
import json
import re
from app2.prompt import linkedin_gpt_prompt_template, generate_viral_prompt_template
from typing import List, Dict, Union
from app2.schemas import (
    StrategyInput, StrategyOutput,
    PostGenerationInput, PostOutput,
    PostEditInput, PostEditOutput, CalendarEntry,
    BulkPostGenerationInput, BulkPostOutput, LinkedInPostInput, LinkedInPostOutput, ViralTemplateOutput
)
from app2.client import call_gemini
from app2.prompt import generate_prompt
from app2.utils import extract_calendar_for_approval, schedule_approved_posts, build_post_prompt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Content Strategy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or set to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import json
from fastapi import HTTPException

@app.post("/generate-strategy", response_model=StrategyOutput)
def generate_strategy(data: StrategyInput):
    prompt = generate_prompt(data)
    content = call_gemini(prompt)
    content = content.strip('`').lstrip('json\n')
    print("Generated Content:",content )  # Debugging output

    if not content.strip().startswith("{"):
        raise HTTPException(status_code=400, detail="LLM response is not valid JSON.")

    try:
        cleaned = content.strip().replace("llm_content:", "", 1).strip()
        parsed = json.loads(cleaned)
        return StrategyOutput(content=parsed)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON response: {str(e)}")


@app.post("/generate-post", response_model=Union[PostOutput, BulkPostOutput])
def generate_post(data: PostGenerationInput):
    calendar_data = data.calendar

    # Flatten 28 posts from week_1 to week_4
    all_days = []
    for week_key in ["week_1", "week_2", "week_3", "week_4"]:
        week = calendar_data.get(week_key)
        if not week:
            raise HTTPException(status_code=400, detail=f"Missing {week_key} in calendar")
        all_days.extend(week["days"])

    def generate_post_for_day(day_index: int):
        if not (1 <= day_index <= len(all_days)):
            raise HTTPException(status_code=400, detail=f"Invalid day number: {day_index}")
        entry = all_days[day_index - 1]
        post_prompt = build_post_prompt(entry)
        content = call_gemini(post_prompt)
        return PostOutput(title=entry["title"], content=content)

    # Handle single day
    if isinstance(data.day_number, int):
        return generate_post_for_day(data.day_number)

    # Handle list of days
    elif isinstance(data.day_number, list):
        results = [generate_post_for_day(day) for day in data.day_number]
        return BulkPostOutput(posts=results)

    # Handle all days
    else:
        results = [generate_post_for_day(i + 1) for i in range(len(all_days))]
        return BulkPostOutput(posts=results)


@app.post("/edit-post", response_model=PostEditOutput)
def edit_post(data: PostEditInput):
    prompt = f"Edit the following post based on the instruction:\n\nInstruction: {data.instructions}\n\nOriginal Post:\n{data.original_post}"
    edited_post = call_gemini(prompt)
    return PostEditOutput(edited_post=edited_post)


@app.post("/schedule-calendar")
def schedule_calendar(
    posts: List[Dict] = Body(...),
    start_date: str = Body(...)
):
    result = schedule_approved_posts(posts, start_date)
    return result


@app.post("/linkedin-gpt", response_model=LinkedInPostOutput)
def generate_linkedin_post(data: LinkedInPostInput):
    prompt = linkedin_gpt_prompt_template(data.topic)
    response = call_gemini(prompt)

    # Remove ```json or ``` from start and end
    cleaned = re.sub(r"^```json|^```|```$", "", response.strip()).strip()

    print("Cleaned LinkedIn Post:", cleaned)  # Optional debug

    try:
        parsed = json.loads(cleaned)
        return LinkedInPostOutput(post=parsed["post"])
    except (json.JSONDecodeError, KeyError) as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON response: {str(e)}")


@app.get("/generate-viral-templates", response_model=ViralTemplateOutput)
def generate_viral_templates():
    prompt = generate_viral_prompt_template()
    raw_response = call_gemini(prompt)
    print("Raw Gemini Response:\n", raw_response)  # Debug log

    # Clean the response: remove markdown ```json blocks or preamble text
    cleaned = raw_response.strip()

    # Remove markdown code fences if present
    if cleaned.startswith("```json") or cleaned.startswith("```"):
        cleaned = re.sub(r"^```json|```$", "", cleaned, flags=re.MULTILINE).strip()

    # Extract valid JSON from embedded text (in case of preamble)
    if not cleaned.startswith("{"):
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if match:
            cleaned = match.group(0)
        else:
            raise HTTPException(status_code=500, detail="No valid JSON object found in Gemini output.")

    try:
        parsed = json.loads(cleaned)
        print("Parsed Viral Template Data:", parsed)
        return ViralTemplateOutput(templates=parsed)
    except json.JSONDecodeError as e:
        print("JSON parsing error:", e)
        raise HTTPException(status_code=500, detail=f"JSON decoding failed: {str(e)}")