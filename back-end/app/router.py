from fastapi import APIRouter, UploadFile, HTTPException
from app.process import parse_opml, download_episode  # Import processing functions
from typing import Dict, List
from fastapi.responses import StreamingResponse


router = APIRouter()

@router.post("/upload/", response_model=Dict[str, List[Dict[str, str]]])
async def upload_opml(opml_file: UploadFile) -> Dict[str, List[Dict[str, str]]]:
    return await parse_opml(opml_file)

@router.post("/download_episode/")
async def download_episode_endpoint(episode_url: str) -> StreamingResponse:
    return await download_episode(episode_url)
