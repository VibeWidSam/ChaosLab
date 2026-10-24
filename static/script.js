
const messageBox = document.getElementById("action-message");
let actionRunning = false;

function showMessage(message, isError = false) {
  messageBox.textContent = message;
  messageBox.className = isError ? "message error" : "message success";
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed. Please try again.");
  }

  return data;
}

async function refresh() {
  try {
    const services = await apiRequest("/api/services");
    let healthy = 0;
    let failed = 0;

    Object.entries(services).forEach(([name, info], index) => {
      const card = document.getElementById("card-" + (index + 1));
      if (!card) return;

      const status = card.querySelector(".status");
      status.textContent = info.status;
      status.className =
        "status " + (info.status === "Healthy" ? "healthy" : "failed-status");

      if (info.status === "Healthy") healthy++;
      else failed++;
    });

    document.getElementById("total").textContent =
      Object.keys(services).length;
    document.getElementById("healthy").textContent = healthy;
    document.getElementById("failed").textContent = failed;

    const history = await apiRequest("/api/history");
    const historyContainer = document.getElementById("history");
    historyContainer.replaceChildren();

    if (history.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "No experiments yet. Try injecting a failure.";
      historyContainer.appendChild(empty);
    } else {
      history.forEach(item => {
        const row = document.createElement("div");
        row.className = "history-row";

        const event = document.createElement("span");
        event.textContent = item.event;

        const result = document.createElement("small");
        result.textContent = item.result;

        const details = document.createElement("span");
        details.append(event, document.createElement("br"), result);

        const time = document.createElement("small");
        time.textContent = item.time;

        row.append(details, time);
        historyContainer.appendChild(row);
      });
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function runAction(action, successMessage) {
  if (actionRunning) return;

  actionRunning = true;
  document.querySelectorAll(".service button, .recover").forEach(button => {
    button.disabled = true;
  });

  try {
    await action();
    await refresh();
    showMessage(successMessage);
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    actionRunning = false;
    document.querySelectorAll(".service button, .recover").forEach(button => {
      button.disabled = false;
    });
  }
}

function injectFailure(service) {
  runAction(
    () => apiRequest("/api/failure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service })
    }),
    "Failure simulated for " + service + ". Check the service health and history."
  );
}

function recoverAll() {
  runAction(
    () => apiRequest("/api/recover", { method: "POST" }),
    "Recovery completed. All simulated services have been restored."
  );
}

refresh();
