let transaksiData = [];

fetch("data/transaksi.json")
  .then((response) => response.json())
  .then((data) => {
    transaksiData = data;
    renderPeople(transaksiData);
  })
  .catch((error) => {
    console.log("Data tidak ditemukan", error);
  });

function renderPeople(data) {
  const container = document.getElementById("transaksiHistori");

  container.innerHTML = "";

  data.forEach((people, index) => {
    const div = document.createElement("div");

    div.className = index % 2 === 0 ? "two-find-1" : "two-find-11";
    div.style.color = index % 2 === 0 ? "red" : "green";

    div.innerHTML = `
    <div class="people">
                <img
                  style="width: 48px; height: 48px"
                  src="${people.image}"
                  alt="people"
                />
              </div>
              <div class="phone">
                <div class="name">
                  <p class="teks-16" >${people.name}</p>
                </div>
                <div class="telp">
                  <p class="teks-16">${people.phone}</p>
                </div>
              </div>
              <div class="price">
                <p class="teks-14">${people.amount}</p>
              </div>
              <div class="trash">
                <img src="/asset/images/history/Trash.svg" alt="trash" />
              </div>
      `;

    container.appendChild(div);

    div.addEventListener("click", function (e) {
      e.preventDefault();

      const variabelData = `name=${people.name}&phone=${people.phone}&photo=${people.image}&amount=${people.amount}`;

      const searchParams = new URLSearchParams(variabelData);
      console.log("data", searchParams.toString());
      getParams(searchParams);
      //   const url = `/src/historyTransaction/index.html?${searchParams.toString()}`;

      //   window.location.href = url;
    });
  });
}

function getParams(param) {
  const imageModal = param.get("photo") || "";
  const nameModal = param.get("name") || "Nama tidak ditemukan";
  const phoneModal = param.get("phone") || "No telp tidak ditemukan";
  const amountModal = param.get("amount") || "Tidak ditemukan";

  const containerImage = document.querySelector(".modal-image");
  const containerName = document.querySelector(".modal-name");
  const containerAmount = document.querySelector(".modal-mount");
  const containerPhone = document.querySelector(".modal-phone");

  containerImage.innerHTML = "";
  containerName.innerHTML = "";
  containerAmount.innerHTML = "";
  containerPhone.innerHTML = "";

  const divImage = document.createElement("div");
  divImage.innerHTML = `
    <img src="${imageModal}" alt="photo" />
    `;
  containerImage.appendChild(divImage);

  const divName = document.createElement("div");
  divName.innerHTML = `
    <p class="modal-item">${nameModal}</p>
    `;
  containerName.appendChild(divName);

  const divPhone = document.createElement("div");
  divPhone.innerHTML = `
    <p class="modal-item">${phoneModal}</p> 
    `;
  containerPhone.appendChild(divPhone);

  const divAmount = document.createElement("div");
  divAmount.innerHTML = `
    <p class="modal-item">${amountModal}</p>
    `;
  containerAmount.appendChild(divAmount);
}

//search
const searchInput = document.querySelector('input[name="search"]');

searchInput.addEventListener("input", function () {
  const dataSearch = this.value.toLowerCase();

  const filter = transaksiData.filter((person) => {
    return (
      person.name.toLowerCase().includes(dataSearch) ||
      person.phone.toLowerCase().includes(dataSearch)
    );
  });
  renderPeople(filter, dataSearch);
});
const onClick = document.getElementById("transaksiHistori");
const closeModal = document.querySelector(".background");
const modal = document.querySelector(".modal");

// show modal
onClick.addEventListener("click", function (e) {
  e.preventDefault();

  const poto = this.target;

  //   console.log("data", e, poto);
  modal.classList.add("active");
});

modal.addEventListener("click", function (a) {
  if (!closeModal.contains(a.target)) {
    modal.classList.remove("active");
  }
});

//show hambueger
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
