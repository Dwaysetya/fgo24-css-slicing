const form = document.getElementById("inputPin");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const getPin = document.querySelectorAll(".pin-box");
  const message = document.querySelector(".message");

  let fullPin = "";
  getPin.forEach((item) => {
    fullPin += item.value;
  });
  console.log("pin", fullPin);

  message.textContent = "";
  message.classList.remove("error", "success");
  if (fullPin.length < 6) {
    message.textContent = "Pin harus 6 character";
    message.classList.add("error");
    return;
  } else if (!/^\d{6}$/.test(fullPin)) {
    message.textContent = "Pin harus angka";
    message.classList.add("error");
    return;
  } else {
    message.textContent = "Create Pin Berhasil";
    message.classList.add("success");
  }

  const dataPin = {
    pin: fullPin,
  };

  localStorage.setItem("pin", JSON.stringify(dataPin));
  this.reset();
});
