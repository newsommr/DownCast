from bs4 import BeautifulSoup
from fastapi import HTTPException, UploadFile
from fastapi.responses import StreamingResponse
import requests

# Constants
TIMEOUT_SECONDS = 10
MAX_DOWNLOAD_SIZE_MB = 200

# Supported audio content types
SUPPORTED_AUDIO_TYPES = [
    'audio/mpeg',
    'audio/aac',
    'audio/aacp',
    'audio/mp4',
    'audio/x-aac',
    'audio/wav',
    'audio/x-wav',
    'audio/ogg',
    'application/ogg',
    'audio/x-m4a',
    'audio/flac',
    'audio/webm',
]

async def parse_opml(opml_file: UploadFile) -> dict:
    try:
        content = await opml_file.read()
        soup = BeautifulSoup(content, "html.parser")
        feeds = soup.find("outline", {"text": "feeds"})

        if not feeds:
            raise HTTPException(status_code=400, detail="No feeds found in the OPML file")

        podcast_data = {}

        for feed in feeds.find_all("outline", recursive=False):
            podcast_title = feed.get("title")
            if not podcast_title:
                continue

            episodes = []
            for episode in feed.find_all("outline", type="podcast-episode"):
                episode_data = {
                    "title": episode.get("title", ""),
                    "url": episode.get("url", ""),
                    "enclosureUrl": episode.get("enclosureurl", "")
                }
                if all(episode_data.values()):
                    episodes.append(episode_data)

            if episodes:
                podcast_data[podcast_title] = episodes

        return podcast_data

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

async def download_episode(episode_url: str) -> StreamingResponse:
    try:
        response = requests.get(episode_url, stream=True, timeout=TIMEOUT_SECONDS)
        response.raise_for_status()

        content_type = response.headers.get('Content-Type', '')
        if not any(audio_type in content_type for audio_type in SUPPORTED_AUDIO_TYPES):
            raise HTTPException(status_code=415, detail="Unsupported Media Type")

        content_length = response.headers.get('Content-Length')
        if content_length and int(content_length) > (MAX_DOWNLOAD_SIZE_MB * 1024 * 1024):
            raise HTTPException(status_code=413, detail=f"Episode exceeds {MAX_DOWNLOAD_SIZE_MB}MB limit")

        def content_generator():
            for chunk in response.iter_content(chunk_size=8192):
                yield chunk

        return StreamingResponse(content_generator(), media_type="audio/mpeg", headers={
            "Content-Disposition": f"attachment; filename=episode.mp3"
        })

    except requests.Timeout:
        raise HTTPException(status_code=408, detail="Request Timeout")
    except requests.ConnectionError:
        raise HTTPException(status_code=502, detail="Bad Gateway")
    except requests.TooManyRedirects:
        raise HTTPException(status_code=310, detail="Too many redirects")
    except requests.HTTPError as e:
        status_code = e.response.status_code
        if status_code == 404:
            raise HTTPException(status_code=404, detail="Episode not found")
        elif status_code == 503:
            raise HTTPException(status_code=503, detail="Service Unavailable")
        else:
            raise HTTPException(status_code=500, detail=f"HTTP Error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unable to download the episode: {str(e)}")
