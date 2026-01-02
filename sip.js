let chart;

function calculateSIP() {
  const P = Number(document.getElementById("sip").value);
  const r = Number(document.getElementById("rate").value) / 12 / 100;
  const n = Number(document.getElementById("years").value) * 12;

  const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const investedAmount = P * n;
  const earnedAmount = futureValue - investedAmount;

  document.getElementById("invested").innerText =
    "₹ " + investedAmount.toLocaleString();

  document.getElementById("earned").innerText =
    "₹ " + Math.round(earnedAmount).toLocaleString();

  document.getElementById("total").innerText =
    "₹ " + Math.round(futureValue).toLocaleString();

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("sipChart"), {
    type: "doughnut",
    data: {
      labels: ["Invested", "Earned"],
      datasets: [
        {
          data: [investedAmount, earnedAmount],
          backgroundColor: ["#94a3b8", "#0f2a44"]
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
