from pydantic import BaseModel
from typing import List, Optional, Dict, Union, Any

class StrategyInput(BaseModel):
    prompt: str
    platforms: List[str]
    niche: Optional[str] = None
    tone: Optional[str] = None
    inspiration: str

class CalendarEntry(BaseModel):
    title: str
    week: str
    day: str
    raw_data: Dict[str, Union[str, None]]

class PostOutput(BaseModel):
    title: str
    content: str

class BulkPostGenerationInput(BaseModel):
    strategy_markdown: str

class BulkPostOutput(BaseModel):
    posts: List[PostOutput]

class StrategyOutput(BaseModel):
    content: dict
    # calendar: List[CalendarEntry]

class PostGenerationInput(BaseModel):
    calendar: Dict[str, Any]  # This is the entire "thirty_day_calendar"
    day_number: Union[int, List[int], None]


class PostEditInput(BaseModel):
    original_post: str
    instructions: str

class PostEditOutput(BaseModel):
    edited_post: str

class LinkedInPostInput(BaseModel):
    topic: str

class LinkedInPostOutput(BaseModel):
    post: str

class ViralTemplateOutput(BaseModel):
    templates: Dict[str, List[str]]