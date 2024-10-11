import { API_URL, LOGIN_ADMINISTRATORS, encryptionKey } from "./constants.js";

function $(selector) {
  return document.querySelector(selector);
}

function all(selector) {
  return document.querySelectorAll(selector);
}

const proceedBtn = $(".proceed-button");
const passwordSection = $(".password-section");
const emailError = $("#emailError");
const floatingEmail = $("#floatingEmail");
const floatingPassword = $("#floatingPassword");

const eye = $(".eye");
const edit = $(".edit");
const emailLabel = $(".emailLabel");

const form = $("#signin_form");

eye.addEventListener("click", () => {
  const eyeIcon = eye.querySelector("i");

  eyeIcon.classList.toggle("bi-eye");
  const currentType = floatingPassword.getAttribute("type");
  floatingPassword.setAttribute(
    "type",
    currentType === "password" ? "text" : "password"
  );
});

proceedBtn.addEventListener("click", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.textContent = "";
  if (floatingEmail.value.trim() === "") {
    emailError.textContent = "Email is required";
  } else if (!emailRegex.test(floatingEmail.value)) {
    emailError.textContent = "Email is not valid";
  } else {
    proceedBtn.classList.add("d-none");
    emailLabel.classList.add("d-none");

    passwordSection.classList.add("show");
    edit.classList.remove("d-none");
    floatingPassword.focus();
  }
});

// edit the email field

edit.addEventListener("click", () => {
  emailLabel.classList.add("show");
  proceedBtn.classList.remove("d-none");
  passwordSection.classList.remove("show");
  edit.classList.add("d-none");
  floatingEmail.focus();
});

floatingEmail.addEventListener("input", () => {
  if (floatingEmail.value.trim() === "") {
    emailError.textContent = "Email is required";
  } else {
    emailError.textContent = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  let loginBtn = document.querySelector(".login-btn");

  loginBtn.textContent = "please wait ...";

  fetch(`${API_URL}/${LOGIN_ADMINISTRATORS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        const message = document.getElementById("error");
        message.textContent = "wrong email or username";
        loginBtn.textContent = "Login";
        setTimeout(() => {
          message.textContent = "";
        }, 5000);
      } else {
        const activeUser = data;
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        handleLogin();
        window.location.href = "avator.html";
      }
    })
    .catch((error) => console.log(error));
});

// Function to encrypt the password
function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, encryptionKey).toString();
}

// Function to decrypt the password
function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Login handler
function handleLogin() {
  const tad_email = floatingEmail.value;
  const tad_password = floatingPassword.value;
  const tad_rememberMe = document.querySelector("#remember-me").checked;

  if (tad_rememberMe) {
    // Save the username and encrypted password to localStorage
    localStorage.setItem("tad_email", tad_email);
    localStorage.setItem("tad_password", encryptPassword(tad_password)); // Encrypt the password
  } else {
    // Clear the localStorage if 'Remember Me' is not checked
    localStorage.removeItem("tad_email");
    localStorage.removeItem("tad_password");
  }

  // Proceed with your login logic here
}

// Function to populate form fields if 'Remember Me' was previously checked
function populateForm() {
  const rememberedUsername = localStorage.getItem("tad_email");
  const rememberedEncryptedPassword = localStorage.getItem("tad_password");

  if (rememberedUsername && rememberedEncryptedPassword) {
    // Populate form fields with decrypted data
    floatingEmail.value = rememberedUsername;
    floatingPassword.value = decryptPassword(rememberedEncryptedPassword); // Decrypt the password
    document.querySelector("#remember-me").checked = true;
  }
}

// Call populateForm() when the page loads
window.onload = populateForm;
