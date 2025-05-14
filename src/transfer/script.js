let peopleData = [];

fetch("data/people.json")
  .then((response) => response.json())
  .then((data) => {
    peopleData = data;
    renderPeople(peopleData);
  })
  .catch((error) => {
    console.log("Data tidak ditemukan", error);
  });

function renderPeople(data, dataSearch, currentPage = 1, itemHalaman = 5) {
  const container = document.getElementById("peopleData");
  const result = document.getElementById("result");

  container.innerHTML = "";
  result.textContent = "";

  const total = data.length;
  if (total > 0) {
    result.textContent = `${total} Result Found For "${dataSearch}"`;
  }

  const start = (currentPage - 1) * itemHalaman;
  const end = start + itemHalaman;
  const paginatedData = data.slice(start, end);

  const table = document.createElement("table");
  table.className = "people-table";

  const tbody = document.createElement("tbody");

  paginatedData.forEach((people, index) => {
    const row = document.createElement("tr");
    row.className = index % 2 === 0 ? "two-find-1" : "two-find";

    row.innerHTML = `
      <td class="photo-cell">
        <img src="${people.photo}" alt="people" class="people-img" />
      </td>
      <td class="info-cell">
        <p class="people-name">${people.name}</p>
      </td>
       <td class="info-cell">
        <p class="people-phone">${people.phone}</p>
      </td>
      <td class="icon-cell">
        <img src="/asset/images/transfer/Star.svg" alt="star" class="star-icon" />
      </td>
    `;

    row.addEventListener("click", function () {
      const variabelData = `name=${people.name}&phone=${people.phone}&photo=${people.photo}`;
      const searchParams = new URLSearchParams(variabelData);
      const url = `/src/transfer-detail/index.html?${searchParams.toString()}`;
      window.location.href = url;
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  renderPagination(data, dataSearch, currentPage, itemHalaman);
}

//pagination

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

  const filter = peopleData.filter((person) => {
    return (
      person.name.toLowerCase().includes(dataSearch) ||
      person.phone.toLowerCase().includes(dataSearch)
    );
  });
  renderPeople(filter, dataSearch);
});

//show-dropdown
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
