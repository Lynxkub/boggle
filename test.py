from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    def setUp(self):
        self.client=app.test_client()
        app.config["TESTING"]=True
    
    def test_homepage(self):
        with self.client:
            response=self.client.get("/")
            self.assertIn("make_board", session)
            