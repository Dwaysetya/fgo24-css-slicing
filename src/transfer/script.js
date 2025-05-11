console.log("coba");

fetch("data/people.json")
  .then((Response) => Response.json())
  .then((data) => {
    const container = document.getElementById("peopleData");

    const result = document.getElementById("result");

    const total = data.length;
    if (total > 0) {
      result.textContent = `${total} Result Found For Ghaluh`;
    }
    data.forEach((people, index) => {
      const div = document.createElement("div");

      if (index % 2 == 0) {
        div.className = "two-find-1";
      } else {
        div.className = "two-find-11";
      }

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
    });
  })
  .catch((error) => {
    console.log("data tidak ditemukan", error);
  });

//show-dropdown
