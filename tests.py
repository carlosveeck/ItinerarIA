import pytest
from fastapi.testclient import TestClient
from api import app
from api import Request

client = TestClient(app)

class Tests:
    def test_init(self):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == "OK"

    def test_prompt(self):
        send = {"username": "Joao", "user_input": "Olá!"}
        response = client.post("/prompt", json=send)
        assert response.status_code == 200
        assert len(response.json()["itinerario"]) > 0
