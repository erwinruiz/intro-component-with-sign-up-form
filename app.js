const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#last_name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// Create Error Message
const createError = (inputName, textMessage, isPassword = false) => {
  // create the HTML elements
  const error = document.createElement("div");
  const icon = document.createElement("img");
  const message = document.createElement("p");

  // insert data
  icon.src = "./images/icon-error.svg";
  icon.alt = "error icon";
  message.textContent = textMessage;

  // verify if is the password field to give more space to the text message by adding a CSS class
  if (isPassword) {
    message.classList.add("password_message");
  }

  // make structure
  error.appendChild(icon);
  error.appendChild(message);

  // add CSS classes
  error.classList.add("error");
  error.classList.add(`${inputName}_error`);

  return error;
};

const validateEmail = (email) => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailInput.value.match(reg)) {
    return true;
  } else {
    false;
  }
};

// Add Events Listeners
// Name Input
nameInput.addEventListener("keyup", () => {
  if (nameInput.value.trim() !== "" && document.querySelector(".name_error")) {
    document.querySelector(".name_error").remove();
    nameInput.classList.remove("error_input");
  }
});

const validateNameInput = () => {
  if (nameInput.value.trim() === "" && !document.querySelector(".name_error")) {
    nameInput.classList.add("error_input");

    const error = createError("name", "First Name cannot be empty");

    form.insertBefore(error, lastNameInput);
  }
};

// Last Name Input
lastNameInput.addEventListener("keyup", () => {
  if (
    lastNameInput.value.trim() !== "" &&
    document.querySelector(".lastName_error")
  ) {
    document.querySelector(".lastName_error").remove();
    lastNameInput.classList.remove("error_input");
  }
});

const validateLastNameInput = () => {
  if (
    lastNameInput.value.trim() === "" &&
    !document.querySelector(".lastName_error")
  ) {
    lastNameInput.classList.add("error_input");

    const error = createError("lastName", "Last Name cannot be empty");

    form.insertBefore(error, emailInput);
  }
};

// Email Input
emailInput.addEventListener("keyup", () => {
  const emailIsValid = validateEmail();
  if (emailIsValid && document.querySelector(".email_error")) {
    document.querySelector(".email_error").remove();
    emailInput.classList.remove("error_input");
  }
});

const validateEmailInput = () => {
  const emailIsValid = validateEmail();
  if (!emailIsValid && !document.querySelector(".email_error")) {
    emailInput.classList.add("error_input");

    const error = createError("email", "Looks like this is not an email");

    form.insertBefore(error, passwordInput);
  }
};

// Password Input
passwordInput.addEventListener("keyup", () => {
  if (
    passwordInput.value.trim().length > 5 &&
    document.querySelector(".password_error")
  ) {
    document.querySelector(".password_error").remove();
    passwordInput.classList.remove("error_input");
  }
});

const validatePasswordInput = () => {
  if (
    !(passwordInput.value.trim().length > 5) &&
    !document.querySelector(".password_error")
  ) {
    passwordInput.classList.add("error_input");

    const error = createError(
      "password",
      "Password must contains at least 6 characters",
      true
    );

    error.classList.add("password_error");
    form.insertBefore(error, document.querySelector("form button"));
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateNameInput();
  validateLastNameInput();
  validateEmailInput();
  validatePasswordInput();
});
