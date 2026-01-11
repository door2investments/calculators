let userInteracted = false;

function calculateGoal() {
  let G = +goal.value;
  let y = +years.value;
  let inf = +inflation.value/100;
  let r = +expectedReturn.value/100/12;
  let n = y*12;

  let futureGoal = G * Math.pow(1+inf, y);
  let sip = futureGoal * r / ((Math.pow(1+r,n)-1));
  // let sip = futureGoal * r / ((Math.pow(1+r,n)-1)*(1+r));
  
  future.innerHTML = "₹ " + Math.round(futureGoal).toLocaleString();
  sipreq.innerHTML = "₹ " + Math.round(sip).toLocaleString();
    triggerPopupWithDelay(
      `Hi, I calculated my ${mode === "sip" ? "SIP" : "lumpsum"} investment and would like professional advice to achieve my target amount. Please guide me.`
    );
}

// Run default calculation on page load
window.addEventListener("DOMContentLoaded", () => {
  calculateGoal();
});

let popupShown = sessionStorage.getItem("advisorPopupShown");

function showPopup(prefilledMessage) {
  if (!userInteracted) return;
  if (sessionStorage.getItem("advisorPopupShown")) return;

  const phone = "919390250541";
  const encodedMsg = encodeURIComponent(prefilledMessage);

  document.getElementById("whatsappLink").href =
    `https://wa.me/${phone}?text=${encodedMsg}`;

  document.getElementById("advisorPopup").style.display = "flex";
  sessionStorage.setItem("advisorPopupShown", "true");
}


function closePopup() {
  document.getElementById("advisorPopup").style.display = "none";
}

function triggerPopupWithDelay(message, delay = 5000) {
  setTimeout(() => {
    showPopup(message);
  }, delay);
}


setTimeout(() => {
  userInteracted = true;
  showPopup(
    "Hi, I used your investment calculator and would like guidance on achieving my goal. Please help me with the right strategy."
  );
}, 30000);



