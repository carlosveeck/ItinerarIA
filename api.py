from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Request(BaseModel):
    user_input: str

@app.get("/")
async def ok_endpoint():
    return {"message":"ok"}

@app.get("/hello")
async def hello_endpoint(name: str = 'World'):
    return {"message": f"Hello, {name}!"}

@app.post("/input")
async def place_input(user_input: str):
    return{"message": f"user input posted successfully: {user_input}"}

@app.post("/input_pydantic")
async def place_input(user: Request):
    return{"message": f"user input posted successfully: {user.user_input}"}