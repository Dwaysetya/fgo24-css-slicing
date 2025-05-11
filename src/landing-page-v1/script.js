const hamburgerButton = document.querySelector(".dropdown-master");
const dropdownMenu = document.querySelector(".dropdown-menu");

hamburgerButton.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("active")) {
    dropdownMenu.classList.remove("active");
  } else {
    dropdownMenu.classList.add("active");
  }

  document.addEventListener("click", function (event) {
    const onHamburgerButton = hamburgerButton.contains(event.target);
    const clickDrpdown = menubar.contains(event.target);

    if (
      dropdownMenu.classList("active") &&
      !onHamburgerButton &&
      !clickDrpdown
    ) {
      menu.classList.remove("active");
    }
  });
});
