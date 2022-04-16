const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const card = document.querySelector(".card");
const btnsContainer = document.querySelector(".buttons-container");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const showPwdBtns = document.querySelectorAll(".show-pwd");

const formSubmitedMarkup = `
  <div class="form-submited">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <h2>Form submit success!</h2>
  </div>
`;

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isValidPassword(password) {
  return /^.{4,20}$/.test(password);
}

function isNumeric(value) {
  return /^[0-9]+$/.test(value);
}

function checkInputs() {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (firstNameValue === "") {
    setError(firstName, "First name cannot be blank");
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    setError(lastName, "Last name cannot be blank");
  } else {
    setSuccess(lastName);
  }

  if (emailValue === "") {
    setError(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setError(email, "Not a valid email");
  } else {
    setSuccess(email);
  }

  if (phoneValue === "") {
    setError(phone, "Phone number cannot be blank");
  } else if (!isNumeric(phoneValue)) {
    setError(phone, "You must include only numbers");
  } else {
    setSuccess(phone);
  }

  if (passwordValue === "") {
    setError(password, "Password cannot be blank");
  } else if (!isValidPassword(passwordValue)) {
    setError(password, "Password should be between 4 and 20 characters");
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Confirm password cannot be blank");
  } else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPassword, "Passwords does not match");
  } else if (!isValidPassword(confirmPasswordValue)) {
    setError(confirmPassword, "Password should be between 4 and 20 characters");
  } else {
    setSuccess(confirmPassword);
  }
}

function afterSubmit() {
  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
      e.target.parentElement.classList.remove("error", "success");
    });
    input.addEventListener("blur", () => {
      checkInputs();
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();

  afterSubmit();

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    email.value === "" ||
    phone.value === "" ||
    password.value === "" ||
    confirmPassword.value === "" ||
    password.value !== confirmPassword.value ||
    !isValidPassword(password.value) ||
    !isValidPassword(confirmPassword.value)
  ) {
    return false;
  }

  card.innerHTML = formSubmitedMarkup;
  btnsContainer.remove();
});

showPwdBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    const eyeImg = e.target.closest("img");
    const input = button.parentElement.querySelector("input");

    button.classList.toggle("show");

    if (button.classList.contains("show")) {
      eyeImg.src = "./images/eye-off.svg";
      input.type = "text";
    } else {
      eyeImg.src = "./images/eye.svg";
      input.type = "password";
    }
  });
});

function setError(input, message) {
  const form = input.parentElement;
  const small = form.querySelector("small");
  form.classList.remove("success");
  form.classList.add("error");
  small.innerText = message;
}

function setSuccess(input) {
  const form = input.parentElement;
  form.classList.remove("error");
  form.classList.add("success");
}
