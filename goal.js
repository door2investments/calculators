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
  showPopup(
  "Hi, I used your goal planning calculator and would like help in structuring the right SIP to achieve my goal. Please guide me."
);

}

// Run default calculation on page load
window.addEventListener("DOMContentLoaded", () => {
  calculateGoal();
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




