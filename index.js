document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const closeBtn = document.getElementById("btn-close");
  const dropdown = document.querySelector(".header__link-dropdown");
  const dropdownToggle = document.getElementById("dropdown-toggle");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("header__nav--active");
  });
  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("header__nav--active");
  });
  document.addEventListener("click", (e) => {
    if (navMenu && !navMenu.contains(e.target) && e.target !== menuToggle) {
      navMenu.classList.remove("header__nav--active");
    }
  });

  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
    dropdown.querySelector(".header__link_cases").style.color = "#ddd";
    dropdown.querySelector(".dropdown-arrow").style.color = "#ddd";
  });
  dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.remove("active");
  });
});
