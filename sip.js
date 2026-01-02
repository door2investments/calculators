let mode = "sip";
let chart;

function setMode(m) {
  mode = m;

  document.getElementById("sipInputs").style.display =
    m === "sip" ? "block" : "none";
  document.getElementById("lumpInputs").style.display =
    m === "lump" ? "block" : "none";

  document.getElementById("sipBtn").classList.toggle("active", m === "sip");
  document.getElementById("lumpBtn").classList.toggle("active", m === "lump");
}

function calculate() {
  if (mode === "sip") {
    calculateSIP();
    showPopup(
  `Hi, I calculated my ${mode === "sip" ? "SIP" : "lumpsum"} investment and would like professional advice to achieve my target amount. Please guide me.`
);

  }
  else { 
    calculateLumpsum();
    showPopup(
  `Hi, I calculated my ${mode === "sip" ? "SIP" : "lumpsum"} investment and would like professional advice to achieve my target amount. Please guide me.`
);
  }
}

function calculateSIP() {
  const P = Number(document.getElementById("sip").value);
  const r = Number(document.getElementById("rate").value) / 12 / 100;
  const n = Number(document.getElementById("years").value) * 12;

  const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = P * n;
  const earned = fv - invested;

  updateUI(invested, earned, fv);
}

function calculateLumpsum() {
  const P = Number(document.getElementById("lumpAmount").value);
  const r = Number(document.getElementById("lumpRate").value) / 100;
  const n = Number(document.getElementById("lumpYears").value);

  const fv = P * Math.pow(1 + r, n);
  const invested = P;
  const earned = fv - invested;

  updateUI(invested, earned, fv);
}

function updateUI(invested, earned, total) {
  document.getElementById("invested").innerText =
    "₹ " + invested.toLocaleString();

  document.getElementById("earned").innerText =
    "₹ " + Math.round(earned).toLocaleString();

  document.getElementById("total").innerText =
    "₹ " + Math.round(total).toLocaleString();

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("sipChart"), {
    type: "doughnut",
    data: {
      labels: ["Invested", "Earned"],
      datasets: [{
        data: [invested, earned],
        backgroundColor: ["#94a3b8", "#0f2a44"]
      }]
    },
    options: {
      plugins: { legend: { position: "bottom" } }
    }
  });
}

// Run default calculation on page load
window.addEventListener("DOMContentLoaded", () => {
  setMode("sip");   // ensure SIP is active
  calculate();     // calculate using default values
});

let popupShown = sessionStorage.getItem("advisorPopupShown");

function showPopup(prefilledMessage) {
  if (popupShown) return;

  const phone = "919390250541"; // your WhatsApp number
  const encodedMsg = encodeURIComponent(prefilledMessage);

  document.getElementById("whatsappLink").href =
    `https://wa.me/${phone}?text=${encodedMsg}`;

  document.getElementById("advisorPopup").style.display = "flex";
  sessionStorage.setItem("advisorPopupShown", "true");
}

function closePopup() {
  document.getElementById("advisorPopup").style.display = "none";
}

setTimeout(() => {
  showPopup(
    "Hi, I just used your investment calculator and would like guidance on achieving my goal. Please help me with the right investment strategy."
  );
}, 30000);

