import unittest
from app import app, services, history

class ChaosLabTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        for service in services:
            services[service]["status"] = "Healthy"
        history.clear()

    def test_homepage_loads(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"ChaosLab", response.data)

    def test_failure_affects_dependents(self):
        response = self.client.post("/api/failure", json={"service": "Database"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(services["Database"]["status"], "Failed")
        self.assertEqual(services["Order Service"]["status"], "Failed")
        self.assertEqual(services["Frontend"]["status"], "Failed")

    def test_recovery_restores_services(self):
        self.client.post("/api/failure", json={"service": "Database"})
        self.client.post("/api/recover")
        self.assertTrue(all(x["status"] == "Healthy" for x in services.values()))

    def test_unknown_service_is_rejected(self):
        response = self.client.post("/api/failure", json={"service": "Unknown"})
        self.assertEqual(response.status_code, 400)

if __name__ == "__main__":
    unittest.main()
