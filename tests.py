import pytest
from fastapi.testclient import TestClient
from api import app
from api import Request

client = TestClient(app)

"""This is an integration test class which verifies that
 the message storing and getting is working properly"""

global message_counter

class Tests:
    def test_init(self):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == "OK"
