let expenseChart;

function calculateExpenseProjection() {
  const monthlyExpense = Number(
    document.getElementById("expense").value
  );
  const inflation = Number(
    document.getElementById("expenseInflation").value
  ) / 100;

  const years = 30;
  const labels = [];
  const data = [];

  for (let i = 1; i <= years; i++) {
    const futureExpense =
      monthlyExpense * Math.pow(1 + inflation, i);

    labels.push(`Year ${i}`);
    data.push(Math.round(futureExpense));
  }

  if (expenseChart) expenseChart.destroy();

  expenseChart = new Chart(
    document.getElementById("expenseChart"),
    {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Estimated Monthly Expense (₹)",
            data: data,
            backgroundColor: "#0f2a44"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                "₹ " + ctx.raw.toLocaleString()
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) =>
                "₹ " + value.toLocaleString()
            }
          }
        }
      }
    }
  );
}

window.addEventListener("DOMContentLoaded", () => {
  calculateExpenseProjection();
});
