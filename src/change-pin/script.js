const form = document.getElementById("inputPin");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const pinInputs = document.querySelectorAll(".pin-box");
  const message = form.querySelector(".message");

  let fullPin = "";
  pinInputs.forEach((input) => {
    fullPin += input.value;
  });

  message.textContent = "";
  message.classList.remove("error", "success");

  if (fullPin.length < 6) {
    message.textContent = "Pin harus 6 karakter.";
    message.classList.add("error");
    return;
  }

  if (!/^\d{6}$/.test(fullPin)) {
    message.textContent = "Pin harus berupa angka.";
    message.classList.add("error");
    return;
  }

  localStorage.setItem("pin", JSON.stringify({ pin: fullPin }));
  message.textContent = "PIN berhasil dibuat.";
  message.classList.add("success");

  pinInputs.forEach((input) => (input.value = ""));
});

// show hamburger

const hamburgerButton = document.querySelector(".toggle");
const menu = document.querySelector(".dropdown");

hamburgerButton.addEventListener("click", function () {
  menu.classList.add("active");
});

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target)) {
    menu.classList.remove("active");
  }
});
