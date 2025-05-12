const form = document.getElementById("inputPin");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inInput = document.querySelectorAll(".pin-box");
  const getPin = JSON.parse(localStorage.getItem("pin"));
  const message = document.querySelector(".message");

  let fullPin = "";
  inInput.forEach((item) => {
    fullPin += item.value;
  });
  console.log("pin", fullPin);

  message.textContent = "";
  message.classList.remove("error", "success");
  if (fullPin !== getPin.pin) {
    message.textContent = "Pin Tidak terdaftar";
    message.classList.add("error");
    this.reset();
    return;
  }
  message.textContent = "Input Pin Berhasil";
  message.classList.add("success");
  window.location.href = "/src/dashboardv1/index.html";

  this.reset();
});
