# ChaosLab — Local Microservice Failure & Recovery Simulator

## Introduction
ChaosLab is an educational DevOps website that simulates failures in a small service dependency chain and demonstrates recovery.

## Objective
Understand how a failure in one service can affect dependent services and verify recovery using automated tests.

## Technology Stack
- Python and Flask
- HTML, CSS and JavaScript
- Git and GitHub
- GitHub Actions for continuous integration
- Python unittest for automated tests

## Features
- Visual service topology
- Controlled simulated service failures
- Dependency impact propagation
- Recovery of all simulated services
- Experiment history
- Automated CI tests on GitHub pushes and pull requests

## Run Locally
1. Install Python 3.
2. Install dependencies: `pip install -r requirements.txt`
3. Start the app: `python app.py`
4. Open `http://127.0.0.1:5000`

## Run Tests
`python -m unittest discover -s tests -v`

## Git and GitHub Workflow
Changes are developed incrementally and committed with meaningful messages. GitHub Actions runs the automated tests on pushes and pull requests.

## DevOps Integration
The GitHub Actions workflow is in `.github/workflows/ci.yml`. It checks out the repository, sets up Python, installs dependencies and runs the test suite.

## Changes and Commit History
Document each meaningful change below with its actual commit hash and a screenshot:
1. Initial website and project setup
2. Service topology and status display
3. Failure injection and dependency impact
4. Recovery and experiment history
5. Automated tests
6. GitHub Actions continuous integration

## Screenshots
Add your own screenshots to the `screenshots/` folder and embed them here after capturing them.

Example:
`![ChaosLab homepage](screenshots/01-homepage.png)`

## Scope and Limitations
This is a local simulation. It does not stop or restart real production services. Recovery currently restores all simulated services to a healthy state.
