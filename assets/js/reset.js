import {
  API_URL,
  sendEmailToVerify,
  sendCodeToVerify,
  sendPasswordToReset,
} from "./constants.js";

function $(selector) {
  return document.querySelector(selector);
}

// btns
const proceedBtn = $(".proceed-button");
const resetCodeBtn = $("#reset-btn");
const submitBtn = $("#submit_form");

// sections
const verifyResetCode = $(".verify-contact-email");
const passwords = $(".passwords");

// errors
const emailError = $("#emailError");
const resetError = $("#resetError");
const passwordError = $("#passwordError");

// inputs
const floatingEmail = $("#floatingEmail");
const floatingCode = $("#floatingCode");
const floatingPassword = $("#floatingPassword");
const floatingConfirmPassword = $("#floatingConfirmPassword");

// form
const form = $("#reset_form");

// successChange;
const successChange = $("#successChange");

proceedBtn.addEventListener("click", () => {
  proceedBtn.textContent = "Please Wait...";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.textContent = "";
  if (floatingEmail.value.trim() === "") {
    emailError.textContent = "Email is required";
  } else if (!emailRegex.test(floatingEmail.value)) {
    emailError.textContent = "Email is not valid";
  } else {
    const email = {
      email: floatingEmail.value,
    };
    fetch(`${API_URL}/${sendEmailToVerify}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((data) => {
        proceedBtn.textContent = "Continue";
        if (!data.success) {
          emailError.textContent = data.message;
          setTimeout(() => {
            emailError.textContent = "";
          }, 10000);
          return;
        }
        proceedBtn.classList.add("d-none");
        verifyResetCode.classList.add("show");
      })
      .catch((err) => console.log(err));
  }
});

resetCodeBtn.addEventListener("click", () => {
  resetCodeBtn.textContent = "Please Wait...";

  const email = {
    email: floatingEmail.value,
    reset_code: floatingCode.value,
  };
  fetch(`${API_URL}/${sendCodeToVerify}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resetCodeBtn.textContent = "Continue";
      if (!data.success) {
        resetError.textContent = data.message;
        resetError.classList.add("text-danger");
        setTimeout(() => {
          resetError.classList.remove("text-danger");
          resetError.textContent = "Enter Reset code sent to your email";
          floatingCode.value = "";
        }, 10000);
      } else {
        resetCodeBtn.classList.add("d-none");
        passwords.classList.add("show");
      }
    })
    .catch((err) => console.log(err));
});

// edit the email field

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  submitBtn.textContent = "please wait ...";

  if (floatingPassword.value !== floatingConfirmPassword.value) {
    passwordError.classList.add("text-danger");
    passwordError.textContent = "Password didn't match";
    submitBtn.textContent = "Submit";
    setTimeout(() => {
      passwordError.classList.remove("text-danger");
      passwordError.textContent = "Enter New Password";
    }, 1500);
    return;
  }

  if (!(floatingPassword.value.length >= 4)) {
    passwordError.classList.add("text-danger");
    passwordError.textContent = "Password Must be at least 5 characters";
    submitBtn.textContent = "Submit";
    setTimeout(() => {
      passwordError.classList.remove("text-danger");
      passwordError.textContent = "Enter New Password";
    }, 1500);
    return;
  }

  fetch(`${API_URL}/${sendPasswordToReset}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      submitBtn.textContent = "Submit";
      if (!data.success) {
        successChange.textContent = "Error Changing Password";
        successChange.classList.add("text-danger");
        setTimeout(() => {
          successChange.textContent = "";
          successChange.classList.remove("text-danger");
        }, 1500);
      } else {
        successChange.classList.add("text-success");
        successChange.textContent = "Passwords changed successfully";
        setTimeout(() => {
          window.location.href = "index.html";
          successChange.textContent = "";
        }, 1500);
      }
    })
    .catch((error) => console.log(error));
});
