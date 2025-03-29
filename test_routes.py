import pytest
from fastapi.testclient import TestClient
from api import app
from datetime import datetime

client = TestClient(app)

def test_init():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == "OK"

def test_register():
    send = {"usuario": "teste2", "senha": "Senha123*asdfghjk", "preferencias": "natureza"}
    response = client.post("/register", json=send)
    assert response.status_code == 200
    assert response.json()["validado"] == "valido"

def test_bad_password():
    send = {"usuario": "teste4", "senha": "senha123", "preferencias": "natureza"}
    response = client.post("/register", json=send)
    assert response.status_code == 400

def test_missing_user():
    send = {"usuario": "naoexisto", "senha": "Senha123*asdfghjk"}
    response = client.post("/login", json=send)
    assert response.status_code == 400

def test_unauthorized_entry():
    send = {"prompt": "Olá!"}
    response = client.post("/prompt", json=send)
    assert response.status_code == 401

@pytest.fixture(scope="session")
def auth_token():
    """Autentica o usuário e retorna o token para ser usado nos testes."""
    send = {"usuario": "teste2", "senha": "Senha123*asdfghjk"}
    response = client.post("/login", json=send)
    assert response.status_code == 200
    return response.json()["access_token"]

def test_save_itinerary(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    send = {"itinerario": {"a": "a"}}
    response = client.post("/save_itinerary", json=send, headers=headers)
    assert response.status_code == 200

def test_last_itinerary(auth_token):
    send = {"num" : 0}
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.post("/last_itinerary", headers=headers,json=send)
    assert response.status_code == 200
    assert response.json() == {"a": "a"}

def test_att_perfil(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    send = {
        "pais": "brasil",
        "data_nascimento": datetime(2000, 1, 1).date().isoformat(),
        "preferencias": "lagos"
    }
    response = client.post("/att_profile", headers=headers, json=send)
    assert response.status_code == 200

def test_profile(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.get("/profile", headers=headers)
    assert response.status_code == 200
    assert response.json() == {
        "usuario": "teste2",
        "pais": "brasil",
        "preferencias": "lagos",
        "data_nascimento": "2000-01-01"
    }

