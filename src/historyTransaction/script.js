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

function renderPeople(data, dataSearch, currentPage = 1, itemsPerPage = 5) {
  const container = document.getElementById("transaksiHistori");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const table = document.createElement("table");
  table.className = "transaksi-table";

  const tbody = document.createElement("tbody");

  paginatedData.forEach((people, index) => {
    const row = document.createElement("tr");
    row.className = index % 2 === 0 ? "two-find-1" : "two-find-11";

    row.innerHTML = `
      <td class="photo-cell">
        <img src="${people.image}" alt="people" style="width: 48px; height: 48px;" />
      </td>
      <td class="info-cell">
        <p class="teks-16">${people.name}</p>
      </td>
       <td class="info-cell">
        <p class="teks-16">${people.phone}</p>
      </td>
      <td class="price-cell">
        <p class="teks-14">${people.amount}</p>
      </td>
      <td class="trash-cell">
        <img src="/asset/images/history/Trash.svg" alt="trash" />
      </td>
    `;

    row.addEventListener("click", function (e) {
      e.preventDefault();
      const variabelData = `name=${people.name}&phone=${people.phone}&photo=${people.image}&amount=${people.amount}`;
      const searchParams = new URLSearchParams(variabelData);
      console.log("data", searchParams.toString());
      getParams(searchParams);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  renderPagination(data, dataSearch, currentPage, itemsPerPage);
}

function renderPagination(data, keyword, pageSekarang, itemPerHalaman) {
  const totalPage = Math.ceil(data.length / itemPerHalaman);
  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = "";

  if (totalPage <= 1) return;

  const btnPrev = document.createElement("button");
  btnPrev.textContent = "Prev";
  btnPrev.disabled = pageSekarang === 1;
  btnPrev.onclick = () =>
    renderPeople(data, keyword, pageSekarang - 1, itemPerHalaman);
  paginationContainer.appendChild(btnPrev);

  for (let i = 1; i <= totalPage; i++) {
    const tombol = document.createElement("button");
    tombol.textContent = i;
    if (i === pageSekarang) tombol.classList.add("active");
    tombol.onclick = () => renderPeople(data, keyword, i, itemPerHalaman);
    paginationContainer.appendChild(tombol);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = pageSekarang === totalPage;
  nextBtn.onclick = () =>
    renderPeople(data, keyword, pageSekarang + 1, itemPerHalaman);
  paginationContainer.appendChild(nextBtn);
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
