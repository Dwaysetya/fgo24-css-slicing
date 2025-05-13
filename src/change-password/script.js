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

// Change password

document
  .getElementById("changePassword")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("data", e);

    const existing = document.getElementById("existing").value;
    const newPassword = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const message = document.querySelector(".message");

    const getData = JSON.parse(localStorage.getItem("user"));

    message.textContent = "";
    message.classList.remove("success", "error");

    if (!getData) {
      message.textContent = "User tidak ditemukan!";
      message.classList.add("error");
      return;
    }

    if (existing !== getData.password) {
      message.textContent = "Password lama salah!";
      message.classList.add("error");
      return;
    }

    if (newPassword !== confirm) {
      message.textContent = "Konfirmasi password tidak sama!";
      message.classList.add("error");
      return;
    }

    getData.password = newPassword;
    localStorage.setItem("user", JSON.stringify(getData));

    message.textContent = "Password berhasil diganti!";
    message.classList.add("success");
    this.reset();
  });

//show-eyes
function togglePassword(eyeId, inputId) {
  const eye = document.getElementById(eyeId);
  const input = document.getElementById(inputId);

  eye.addEventListener("click", function () {
    const isPassword = input.getAttribute("type") === "password";
    input.setAttribute("type", isPassword ? "text" : "password");
    eye.setAttribute(
      "src",
      isPassword
        ? "/asset/images/register/openEye.svg"
        : "/asset/images/register/closeEye.svg"
    );
  });
}

// 🔁 Panggil fungsi untuk masing-masing input
togglePassword("eyeExisting", "existing");
togglePassword("eyePassword", "password");
togglePassword("eyeConfirm", "confirm");
