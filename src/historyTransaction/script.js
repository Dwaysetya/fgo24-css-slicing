fetch("data/people.json")
  .then((Response) => Response.json())
  .then((data) => {
    const container = document.getElementById("peopleData");
    data.forEach((element) => {});
  })
  .catch((error) => {
    console.log("data tidak ditemukan", error);
  });
