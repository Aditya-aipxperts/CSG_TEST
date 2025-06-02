def generate_prompt(data):
    return f"""
 Social Media Content Strategy Generator 

You are an elite content strategist specializing in viral social media growth. Your mission is to create a comprehensive content strategy that drives engagement, builds authority, and converts followers into customers.

 User Input Variables (Fixed):
- Prompt / Goal: {data.prompt}
- Platform(s): {data.platforms}
- Niche / Sub-niche: {data.niche}
- Tone: {data.tone}
- Brand Inspiration (Creator): {data.inspiration}

⚠️ CRITICAL OUTPUT REQUIREMENTS ⚠️
RETURN ONLY RAW JSON - NO MARKDOWN FORMATTING
DO NOT use ```json or ``` code blocks
DO NOT add any text before or after the JSON
DO NOT use markdown formatting
RETURN PURE JSON ONLY - START WITH {{ and END WITH }}

Your response must begin with {{ and end with }} - nothing else.

Return your response as a properly structured JSON object following this exact schema:

{{
  "content_mood_board": {{
    "tone_and_voice": "string - Adapt {data.tone}'s style to suit the {data.niche}",
    "visual_identity": "string - Color schemes, layout, type style, and platform aesthetics",
    "emotional_triggers": "string - What emotions should the audience feel",
    "content_personality": "string - How the brand sounds",
    "platform_adaptation": "string - How mood/tone varies across {data.platforms}"
  }},
  "ideal_customer_persona": {{
    "demographics_and_roles": "string - Specific details about target audience",
    "pain_points_and_motivations": "string - Key challenges and desires",
    "daily_behaviors_and_content_habits": "string - How they consume content",
    "emotional_drivers": "string - What motivates their decisions",
    "relevance_to_brand_goal": "string - Why they need your solution"
  }},
  "content_strategy_overview": {{
    "primary_objective": "string - Main goal of the content strategy",
    "brand_positioning": "string - Unique position in the market",
    "core_narrative": "string - Overarching story and message",
    "dominant_content_types": "string - Primary content formats",
    "funnel_intent": "Awareness → Engagement → Conversion"
  }},
  "content_pillars": [
    {{
      "pillar_name": "string - Theme name",
      "description": "string - Purpose and focus",
      "content_formats": ["format1", "format2", "format3"],
      "sample_topics": ["topic1", "topic2", "topic3", "topic4", "topic5"],
      "audience_value": "string - What audience gains",
      "platform_fit": "string - Where it works best"
    }}
  ],
  "thirty_day_calendar": {{
    "week_1": {{
      "focus": "string - Pillar name",
      "days": [
        {{
          "day": 1,
          "platform": "string - Platform name",
          "title": "string - Hook/Title",
          "content_type": "string - Content type (Reel, Carousel, Thread, Tweet, Story, Video, Interview)",
          "call_to_action": "string - Specific CTA",
          "pillar": "string - Pillar name",
          "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"]
        }}
      ]
    }},
    "week_2": {{
      "focus": "string - Pillar name",
      "days": [
        {{
          "day": 8,
          "platform": "string - Platform name",
          "title": "string - Hook/Title",
          "content_type": "string - Content type",
          "call_to_action": "string - Specific CTA",
          "pillar": "string - Pillar name",
          "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"]
        }}
      ]
    }},
    "week_3": {{
      "focus": "string - Pillar name",
      "days": [
        {{
          "day": 15,
          "platform": "string - Platform name",
          "title": "string - Hook/Title",
          "content_type": "string - Content type",
          "call_to_action": "string - Specific CTA",
          "pillar": "string - Pillar name",
          "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"]
        }}
      ]
    }},
    "week_4": {{
      "focus": "string - Pillar name",
      "days": [
        {{
          "day": 22,
          "platform": "string - Platform name",
          "title": "string - Hook/Title",
          "content_type": "string - Content type",
          "call_to_action": "string - Specific CTA",
          "pillar": "string - Pillar name",
          "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"]
        }}
      ]
    }}
  }},
  "growth_milestone_action_plan": {{
    "foundation_phase": {{
      "follower_range": "0-1K Followers",
      "posting_frequency": "string - Daily on primary platform, 3x/week on secondary",
      "content_focus": "string - 70% educational, 20% personal, 10% promotional",
      "format_priority": "string - Platform-native content preferences",
      "cta_strategy": "string - Comments and saves to boost engagement",
      "growth_tactics": "string - Consistent hashtag strategy, engage with similar accounts",
      "success_metrics": "string - 5-10% engagement rate, 50+ new followers/week"
    }},
    "momentum_phase": {{
      "follower_range": "1K-5K Followers",
      "posting_frequency": "string - 1-2x daily primary, daily secondary",
      "content_focus": "string - 60% educational, 25% entertainment, 15% promotional",
      "format_priority": "string - Mix of formats, test what resonates",
      "cta_strategy": "string - Shares and saves, build email list",
      "growth_tactics": "string - Collaborations, trending hashtags, community building",
      "success_metrics": "string - 3-7% engagement rate, 100+ new followers/week"
    }},
    "authority_phase": {{
      "follower_range": "5K-15K Followers",
      "posting_frequency": "string - 2x daily primary, 1x daily secondary",
      "content_focus": "string - 50% educational, 30% entertainment, 20% promotional",
      "format_priority": "string - Premium content, longer formats",
      "cta_strategy": "string - Email signups, community joining",
      "growth_tactics": "string - Thought leadership, industry partnerships",
      "success_metrics": "string - 2-5% engagement rate, 200+ new followers/week"
    }},
    "monetization_phase": {{
      "follower_range": "15K+ Followers",
      "posting_frequency": "string - Multiple daily posts, story content",
      "content_focus": "string - 40% educational, 30% entertainment, 30% promotional",
      "format_priority": "string - All formats, premium production",
      "cta_strategy": "string - Product sales, service bookings",
      "growth_tactics": "string - Product launches, affiliate partnerships",
      "success_metrics": "string - 1-3% engagement rate, consistent sales"
    }}
  }}
}}

🚨 ABSOLUTE JSON OUTPUT REQUIREMENTS 🚨
1. **NO MARKDOWN CODE BLOCKS** - Do not use ```json or ``` 
2. **NO ADDITIONAL TEXT** - Only the JSON object
3. **START WITH {{** - First character must be opening brace
4. **END WITH }}** - Last character must be closing brace
5. **VALID JSON SYNTAX** - Properly escaped strings
6. **COMPLETE ALL 28 DAYS** - Each week must have exactly 7 days of content
7. **DISTRIBUTE PLATFORMS EVENLY** across {data.platforms}
8. **INCLUDE 4-6 CONTENT PILLARS** with complete details
9. **USE EXACT CONTENT TYPES ONLY**: Reel, Carousel, Thread, Tweet, Story, Video, Interview
10. **EVERY POST NEEDS EXACTLY 5 HASHTAGS** in array format
11. **HOOK FRAMEWORKS MUST BE INCORPORATED** in titles using proven psychological triggers
12. **DAYS MUST BE NUMBERED 1-28 CONSECUTIVELY**
13. **EACH WEEK FOCUSES ON ONE MAIN PILLAR**

Hook Framework (MUST Use These Patterns in Titles):

**FOMO Hooks:**
- "Most people miss this simple shift..."
- "What 99% of [niche] get wrong about..."
- "The secret [niche experts] don't want you to know..."

**Curiosity Hooks:**
- "What no one tells you about..."
- "The truth about [topic] that nobody talks about..."
- "Here's what happens when you..."

**Contrarian Hooks:**
- "Why the usual [niche] advice doesn't work..."
- "Stop doing [common practice]. Do this instead..."
- "Unpopular opinion: [controversial take]..."

**Urgency Hooks:**
- "Start before it's too late..."
- "The window is closing on..."
- "This changes everything for [audience]..."

**Platform-Specific Hook Styles:**
- **Instagram:** Bold, emoji-filled, "swipe to find out", visual-focused
- **LinkedIn:** Insight-driven, professional tone, industry expertise
- **Twitter/X:** Thread-worthy, bold, concise, controversy-friendly

STRATEGY REQUIREMENTS:
- **Tone:** Strategic, practical, and tailored to {data.niche} with {data.inspiration}'s style
- **Specificity:** Real examples over generic advice
- **Scalability:** Frameworks and templates that support future content batches
- **Platform Optimization:** Tailor suggestions to each platform's trends and algorithm preferences
- **Consistency:** Maintain brand voice across all content pieces

FINAL REMINDER: 
Your entire response must be ONLY the JSON object. 
Start with {{ and end with }}.
NO ```json blocks, NO markdown, NO extra text.
PURE JSON ONLY.
"""




def linkedin_gpt_prompt_template(topic: str) -> str:
    return f"""
You are an expert LinkedIn content creator.

Your task is to help users generate **text-based LinkedIn posts**. The user will give you a vague or specific topic, and you must return a high-quality post idea with context, structure, and tone suitable for LinkedIn.

 Topic: "{topic}"

 Generate:
- A LinkedIn post with a hook, body, and CTA
- Keep it professional yet relatable
- Use storytelling, insight, or personal voice if needed
- No hashtags or emojis unless highly contextual
- Limit to 300-500 words

 OUTPUT FORMAT REQUIREMENTS 
You must return a **pure JSON object** in this exact format:

{{
  "post": "Your full LinkedIn post goes here as one string"
}}

Do NOT include markdown
Do NOT include explanations or formatting
Return only the JSON object — nothing else
"""


def generate_viral_prompt_template():
    return """
You are a top-tier LinkedIn content strategist known for creating viral posts that drive engagement, emotional connection, and credibility.

🎯 TASK:
Generate 6 high-performing post **templates** (not actual posts) for each of the following categories:
1. Announcement Stories
2. Motivational Stories
3. Insightful Stories
4. Struggle Stories

🧠 CRITERIA FOR VIRALITY:
- Use proven storytelling frameworks: PAS (Problem-Agitate-Solution), Hero’s Journey, Relatable Pivot
- Include emotional triggers: surprise, relatability, inspiration, transformation
- Ensure formats follow LinkedIn’s best practices: hook in first line, short paragraphs, line breaks, clarity, and a clear CTA
- Each template should be usable by creators in **various niches** like business, tech, marketing, personal branding, career, or self-growth

📌 TEMPLATE FORMAT GUIDANCE:
- Provide placeholders for personal details, context, or audience (e.g., {your niche}, {key challenge}, {lesson}, {outcome})
- Avoid overly generic advice—make the template feel specific, structured, and adaptable
- Include a suggested CTA (comment, share, DM, etc.)

✅ RESPONSE FORMAT:
Return only raw JSON in this format:
{
  "Announcement Stories": [
    "Template 1",
    "Template 2",
    ...
  ],
  "Motivational Stories": [
    ...
  ],
  "Insightful Stories": [
    ...
  ],
  "Struggle Stories": [
    ...
  ]
}

❌ ABSOLUTELY NO:
- Markdown formatting (no ``` or #)
- Preamble or explanation
- Quotes or labels

Just the JSON. Start with `{` and end with `}`.
"""