const form = document.getElementById("register");

form.addEventListener("submit", function (e) {
    e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm = formData.get("confirm");
  const message = document.querySelector(".message");

  message.textContent = "";
  message.classList.remove("error", "success");
  if (password.length < 6) {
    message.textContent = "Password harus lebih dari 5 character";
    message.classList.add("error");
    return;
  } else if (password !== confirm) {
    message.textContent = "Confirm password harus sama";
    message.classList.add("error");
    return;
  } else {
    message.textContent = "Register Berhasil";
    message.classList.add("success");
    window.location.href = "/src/createPin/index.html";
  }

  const dataUser = {
    email: email,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(dataUser));
  this.reset();
});

//show eyes password
const eyes = document.getElementById("eyeslash");
const password = document.getElementById("password");

eyes.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  this.setAttribute(
    "src",
    type === "password"
      ? "/asset/images/register/closeEye.svg"
      : "/asset/images/register/openEye.svg"
  );
});

const eyesConfirm = document.getElementById("eyeConfirm");
const confirm = document.getElementById("confirm");

eyesConfirm.addEventListener("click", function () {
  const type =
    confirm.getAttribute("type") === "password" ? "text" : "password";
  confirm.setAttribute("type", type);

  this.setAttribute(
    "src",
    type === "password"
      ? "/asset/images/register/closeEye.svg"
      : "/asset/images/register/openEye.svg"
  );
});
