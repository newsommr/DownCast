from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router  # Importing the router from router.py

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://down-cast.fly.dev"],
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["Content-Type", "Accept"],
)

# Include the router
app.include_router(router)
