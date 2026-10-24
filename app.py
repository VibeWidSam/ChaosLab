from flask import Flask, render_template, jsonify, request
from datetime import datetime

app = Flask(__name__)

services = {
    "Frontend": {"status": "Healthy", "depends_on": ["Order Service"]},
    "Order Service": {"status": "Healthy", "depends_on": ["Database"]},
    "Database": {"status": "Healthy", "depends_on": []}
}

history = []

@app.route("/")
def home():
    return render_template(
        "index.html",
        services=services,
        history=history
    )

@app.route("/api/services")
def get_services():
    return jsonify(services)

@app.route("/api/failure", methods=["POST"])
def inject_failure():
    name = (request.json or {}).get("service")

    if name not in services:
        return jsonify({"error": "Unknown service"}), 400

    services[name]["status"] = "Failed"

    affected = [name]
    changed = True
    while changed:
        changed = False
        for service, info in services.items():
            if service not in affected and any(
                dependency in affected for dependency in info["depends_on"]
            ):
                affected.append(service)
                changed = True

    for service in affected:
        services[service]["status"] = "Failed"

    history.insert(0, {
        "time": datetime.now().strftime("%H:%M:%S"),
        "event": name + " failure injected",
        "result": "Failure simulated"
    })

    return jsonify({"services": services, "affected": affected})

@app.route("/api/recover", methods=["POST"])
def recover():
    for service in services:
        services[service]["status"] = "Healthy"

    history.insert(0, {
        "time": datetime.now().strftime("%H:%M:%S"),
        "event": "Recovery executed",
        "result": "All services restored"
    })

    return jsonify({"services": services})

@app.route("/api/history")
def get_history():
    return jsonify(history)

if __name__ == "__main__":
    app.run(debug=True)
