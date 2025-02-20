import pytest
from fastapi.testclient import TestClient
from api import app

client = TestClient(app)

class Tests:
    def test_init(self):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == "OK"

    #OBS: PRECISA MUDAR O USUÁRIO PARA REFAZER TESTES DE REGISTRO

    def test_register(self):
        send = {"usuario": "teste3", "senha": "Senha123*asdfghjk", "preferencias": "natureza"}
        response = client.post("/register", json=send)
        assert response.status_code == 200
        assert response.json()["validado"] == "valido"

    def test_bad_password(self):
        send = {"usuario": "teste4", "senha": "senha123", "preferencias": "natureza"}
        response = client.post("/register", json=send)
        assert response.status_code == 400

    def test_login(self):
        send = {"usuario": "teste", "senha": "Senha123*asdfghjk"}
        #esse não muda
        response = client.post("/login", json=send)
        assert response.status_code == 200

    def test_missing_user(self):
        send = {"usuario": "naoexisto", "senha": "Senha123*asdfghjk"}
        response = client.post("/login", json=send)
        assert response.status_code == 400

    def test_unauthorized_entry(self):
        send = {"prompt": "Olá!"}
        response = client.post("/prompt", json=send)
        assert response.status_code == 401
