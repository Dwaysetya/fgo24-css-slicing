document.getElementById("register").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const message = document.querySelector(".message");

  message.textContent = "";
  message.classList.remove("error", "success");
  if (password.length < 6) {
    message.textContent = "Password harus lebih dari 5 character";
    message.classList.add("error");
    return;
  }
  if (password !== confirm) {
    message.textContent = "Confirm password harus sama";
    message.classList.add("error");
    return;
  }
  message.textContent = "Register Berhasil";
  message.classList.add("success");

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
