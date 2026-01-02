let chart;

function calculateSIP() {
  let P = +sip.value;
  let r = rate.value / 12 / 100;
  let n = years.value * 12;

  let fv = P * ((Math.pow(1+r,n)-1)/r) * (1+r);
  let invested = P * n;
  let earned = fv - invested;

  investedEl = invested.toLocaleString();
  earnedEl = earned.toLocaleString();
  totalEl = Math.round(fv).toLocaleString();

  invested.innerHTML = investedEl;
  earned.innerHTML = earnedEl;
  total.innerHTML = totalEl;

  if(chart) chart.destroy();

  chart = new Chart(sipChart, {
    type: 'doughnut',
    data: {
      labels: ['Invested', 'Earned'],
      datasets: [{
        data: [invested, earned],
        backgroundColor: ['#94a3b8','#0f2a44']
      }]
    }
  });
}

