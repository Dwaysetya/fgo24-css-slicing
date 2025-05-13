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

function renderPeople(data, dataSearch) {
  const container = document.getElementById("peopleData");
  const result = document.getElementById("result");

  container.innerHTML = "";
  result.textContent = "";

  const total = data.length;
  if (total > 0) {
    result.textContent = `${total}  Result Found For ${dataSearch}`;
  } else {
    result.textContent = "";
  }

  data.forEach((people, index) => {
    const div = document.createElement("div");

    div.className = index % 2 === 0 ? "two-find-1" : "two-find-11";

    div.innerHTML = `
    <div class="people">
          <img src="${people.photo}" alt="people" />
        </div>
        <div class="phone">
          <div class="name">
            <p class="teks-16">${people.name}</p>
          </div>
          <div class="telp">
            <p class="teks-16">${people.phone}</p>
          </div>
        </div>
        <div class="trash">
          <img src="/asset/images/transfer/Star.svg" alt="trash" />
        </div>
      `;

    container.appendChild(div);

    div.addEventListener("click", function (e) {
      e.preventDefault();

      const variabelData = `name=${people.name}&phone=${people.phone}&photo=${people.photo}`;
      const searchParams = new URLSearchParams(variabelData);
      console.log("data", searchParams.toString());
      const url = `/src/transfer-detail/index.html?${searchParams.toString()}`;
      window.location.href = url;
    });
  });
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
