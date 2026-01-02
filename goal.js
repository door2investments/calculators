function calculateGoal() {
  let G = +goal.value;
  let y = +years.value;
  let inf = +inflation.value/100;
  let r = +expectedReturn.value/100/12;
  let n = y*12;

  let futureGoal = G * Math.pow(1+inf, y);
  let sip = futureGoal * r / ((Math.pow(1+r,n)-1)*(1+r));

  future.innerHTML = "₹ " + Math.round(futureGoal).toLocaleString();
  sipreq.innerHTML = "₹ " + Math.round(sip).toLocaleString();
}

// Run default calculation on page load
window.addEventListener("DOMContentLoaded", () => {
  calculateGoal();
});


