const form = document.getElementById("amount");
const modal = document.querySelector(".modal");
const modalSuccess = document.querySelector(".modal-success");
const modalFailed = document.querySelector(".modal-failed");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = document.getElementById("nominal").value;
  const message = document.querySelector(".error");
  //   const close = document.querySelector(".modal");

  message.textContent = "";
  if (Number(data) > 0) {
    modal.classList.add("active");
  } else {
    message.textContent = "Amount harus number";
    message.classList.add("error");
  }

  //   document.addEventListener("click", function () {
  //     if (modal.contains(e.target)) {
  //       modal.classList.remove("active");
  //     }
  //   });
});

// get search param

const getParams = new URLSearchParams(window.location.search);
const image = getParams.get("photo") || "";
const nameData = getParams.get("name") || "Nama tidak ditemukan";
const phone = getParams.get("phone") || "No telp tidak ditemukan";

const container = document.querySelector(".people");
const div = document.createElement("div");

div.innerHTML = `
 <img src="${image}" alt="people" class="poto"/>
                <div class="name">
                  <div class="name-item">
                    <p
                      style="font-weight: 600; color: #0b132a; margin: 0"
                      class="teks-16"
                    >
                      ${nameData}
                    </p>
                  </div>
                  <div>
                    <p style="font-weight: 400; margin: 0" class="teks-14">
                      ${phone}
                    </p>
                  </div>
                  <div>
                    <img
                      src="/asset/images/transfer-detail/Sidenav item.svg"
                      alt="verify"
                    />
                  </div>
                </div>

`;
container.appendChild(div);

//validasi -input-pin

const formPin = document.getElementById("inputPin");

formPin.addEventListener("submit", function (e) {
  e.preventDefault();
  const inInput = document.querySelectorAll(".pin-box");
  const getPin = JSON.parse(localStorage.getItem("pin"));

  let fullPin = "";
  inInput.forEach((item) => {
    fullPin += item.value;
  });
  console.log("pin", fullPin);

  if (fullPin !== getPin.pin) {
    modal.classList.remove("active");
    modalFailed.classList.add("active");
    this.reset();
    return;
  } else {
    modal.classList.remove("active");
    modalSuccess.classList.add("active");
  }
  this.reset();
});

const onClick = document.querySelector(".done-failed");

onClick.addEventListener("click", function (a) {
  a.preventDefault();
  console.log("data", a);
  modalFailed.classList.remove("active");
});



//show drpdown
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
