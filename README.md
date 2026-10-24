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
The project was developed and documented through the following Git commits:

Initial website and service topology — f592a97

Automated tests for failure and recovery — 743a136

GitHub Actions continuous integration — 9295879

Project setup and DevOps documentation — 9b2c19f

The initial website commit includes the dashboard and its service failure and recovery functionality. The later commits add automated testing, continuous integration, and project documentation.

## Screenshots
screenshots/01-homepage.png — Main dashboard with healthy services.

screenshots/02-failure.png — Dashboard after a simulated failure.

screenshots/03-recovery.png — Dashboard after service recovery.

screenshots/04-git-history.png — Actual Git commit history.

screenshots/05-github-actions.png — Successful GitHub Actions workflow run.

Screenshots are captured from the actual project and repository.


## Scope and Limitations
This is a local simulation. It does not stop or restart real production services. Recovery currently restores all simulated services to a healthy state.
