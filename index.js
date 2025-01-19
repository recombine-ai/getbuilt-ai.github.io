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

  // --------- FORM ----------------

  // kinda CAPTCHA
  const checkbox = document.querySelector(".form__checkbox-img");

  checkbox.addEventListener("click", (e) => {
    e.preventDefault();
    checkbox.classList.toggle("checked");
  });
  const checkboxLabel = checkbox.parentElement;
  checkboxLabel.addEventListener("click", (e) => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") return;
    e.preventDefault();
    checkbox.click();
  });

  // Form validation

  const form = document.getElementById("request-form");
  const name = form.querySelector('input[name="name"]');
  const email = form.querySelector('input[name="email"]');
  const company = form.querySelector('input[name="company"]');
  const fakeCheckbox = form.querySelector('input[name="privacy-consent"]');
  const formErrors = document.querySelector(".main__form-errors");
  const formBody = document.querySelector(".main__form-body");
  const formDone = document.querySelector(".main__form-done");
  const button = form.querySelector(".form__button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const values = {
        name: name.value,
        email: email.value,
        company: company.value,
        consent: checkbox.classList.contains("checked"),
        fakeConsent: fakeCheckbox.checked,
      };

      button.disabled = true;
      await fetch(
        "https://ibf9nq7m2d.execute-api.eu-central-1.amazonaws.com/prod/connect",
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );
      formBody.classList.add("done");
      formDone.classList.add("done");
      form.reset();
    } else {
      [name, email, company, fakeCheckbox].forEach((input) => {
        input.addEventListener("input", () => {
          validateForm();
        });
      });
      checkbox.addEventListener("click", () => {
        validateForm();
      });
    }
  });

  function validateForm() {
    const errors = [];
    if (!name.value.trim()) {
      errors.push({ text: "full name", input: name });
    }
    if (!email.value.trim()) {
      errors.push({ text: "work email", input: email });
    }
    if (!company.value.trim()) {
      errors.push({ text: "company name", input: company });
    }
    if (!fakeCheckbox.checked && !checkbox.classList.contains("checked")) {
      errors.push({ text: "consent", input: fakeCheckbox });
    }

    formErrors.querySelectorAll("a").forEach((el) => el.remove());
    errors.forEach((error, i) => {
      const a = document.createElement("a");
      a.classList.add("underlined-small");
      a.href = "#";
      a.textContent = error.text + (i < errors.length - 1 ? "," : ".");
      a.addEventListener("click", (e) => {
        e.preventDefault();
        error.input.focus();
      });
      formErrors.appendChild(a);
    });

    if (errors.length) {
      formErrors.classList.add("has-errors");
    } else {
      formErrors.classList.remove("has-errors");
    }

    return errors.length === 0;
  }
});
