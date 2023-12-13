# DownCast

DownCast is a web-based tool for uploading OPML files from Overcast and displaying the podcast episodes contained within. It offers features to validate the uploaded files, ensures they come in the correct .opml format, and gives users the ability to download podcast episodes from given URLs.

## Features

    Drag and Drop file upload.
    OPML file validation.
    List display of podcasts and their episodes from the OPML file.
    Backend API to process the OPML file and retrieve episode details.
    Download capability for podcast episodes.

## Demo
Test out the demo [here](https://downcast.cipherkeeper.dev).
## Frontend
Developed in React, ensure you have Node.js and npm/yarn installed

Navigate to the directory
cd down-cast/front-end

Install dependencies

> npm install

Start the development server

> npm start

## Backend
Developed in Python, utilizing FastAPI

Navigate to the directory
cd down-cast/back-end

Install dependencies
> pip install -r requirements.txt

Run the API server
> uvicorn main:app --reload
>
> ## Usage
1. Navigate to the web application.
2. Drag & Drop or click to upload a .opml file.
3. View the list of podcasts and episodes.
4. Download any podcast episodes.

## API Endpoints

    POST /upload/: Upload an OPML file and get a list of podcasts and episodes.
    POST /download_episode/: Provide an episode URL to download the episode.
