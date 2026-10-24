async function refresh() {
  const response = await fetch("/api/services");
  const services = await response.json();
  let healthy = 0, failed = 0;

  Object.entries(services).forEach(([name, info], index) => {
    const card = document.getElementById("card-" + (index + 1));
    const status = card.querySelector(".status");
    status.textContent = info.status;
    status.className = "status " + (info.status === "Healthy" ? "healthy" : "failed-status");
    if (info.status === "Healthy") healthy++; else failed++;
  });

  document.getElementById("total").textContent = Object.keys(services).length;
  document.getElementById("healthy").textContent = healthy;
  document.getElementById("failed").textContent = failed;

  const historyResponse = await fetch("/api/history");
  const history = await historyResponse.json();
  document.getElementById("history").innerHTML = history.length
    ? history.map(item => `<div class="history-row"><span>${item.event}<br><small>${item.result}</small></span><small>${item.time}</small></div>`).join("")
    : '<p class="empty">No experiments yet. Try injecting a failure.</p>';
}

async function injectFailure(service) {
  await fetch("/api/failure", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({service})
  });
  await refresh();
}

async function recoverAll() {
  await fetch("/api/recover", {method: "POST"});
  await refresh();
}

refresh();
