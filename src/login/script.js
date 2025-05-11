document.getElementById("login").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.querySelector(".message");

  const getData = JSON.parse(localStorage.getItem("user"));

  message.textContent = "";
  message.classList.remove("success", "error");
  if (!getData) {
    message.textContent = "Data tidak terdaftar";
    message.classList.add("error");
    return;
  }
  if (email === getData.email && password === getData.password) {
    message.textContent = "Login berhasil!";
    message.classList.add("success");
    this.reset();
    window.location.href = "/src/dashboardv1/";
  } else {
    message.textContent = "Email atau password salah!";
    message.classList.add("error");
    this.reset();
  }
});

const eyeLogin = document.getElementById("eyeLogin");
const password = document.getElementById("password");

eyeLogin.addEventListener("click", function () {
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
