from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/BFS", tags=["BFS"])
async def get_bfs() -> dict:
    return {
        "path":[(10, 10),(9, 10),(10, 9),(10, 11),(11, 10),(8, 10),(9, 9),(9, 11),(10, 8),(11, 9),(10, 12),(11, 11),(12, 10),(7, 10),(8, 9),(8, 11),(9, 8),(9, 12),(10, 7),(11, 8),(12, 9),(10, 13),(11, 12),(12, 11),(13, 10),(6, 10),(7, 9),(7, 11),(8, 8),(8, 12)],
        "shortest_path:":"[(1,1),(2,2),(3,3)]"
    }