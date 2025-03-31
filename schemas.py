from pydantic import BaseModel
from datetime import datetime,date

class RegisterRequest(BaseModel):
    usuario: str
    senha: str

class LoginRequest(BaseModel):
    usuario: str
    senha: str

class PromptRequest(BaseModel):
    prompt: str
    index: int

class ProfileRequest(BaseModel):
    pais: str
    data_nascimento : date
    preferencias : str

class SaveItinerary(BaseModel):
    itinerario : dict
    index : int

class LastItinerary(BaseModel):
    num : int