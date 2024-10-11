import { API_URL, verifyCode, verifyMail } from "./constants.js";

// query selector helper functions
function $(selector) {
  return document.querySelector(selector);
}
function all(selector) {
  return document.querySelectorAll(selector);
}

// INSTITUTIONS

const institutionDetails = $(".institution-profile");
const institutionBtn = $(".institutionBtn");
const institutionOtpSection = $(".verify-institution-email");
const contactpersonOtpSection = $(".verify-contact-email");

// user accoount section

institutionBtn.addEventListener("click", function (event) {
  event.preventDefault();

  institutionBtn.textContent = "Please Wait...";

  const form = $("#institution_signup_form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  // Using the function to select specific fields
  const selectedData = selectFields(data, [
    "organisation_name",
    "organisation_website",
    "organisation_address",
    "nature_of_business",
    "number_of_users",
  ]);
  if (!allFields(selectedData)) {
    institutionBtn.textContent = "continue";
    institutionDetails.classList.add("show-error");
    setTimeout(() => {
      institutionDetails.classList.remove("show-error");
    }, 1500);
    return;
  }

  institutionBtn.textContent = "Continue";
  institutionDetails.classList.remove("show");
  institutionOtpSection.classList.add("show");
});

// otp section

const institutionOtpBtn = $(".institutionOtpBtn");
const contactPersonSection = $(".contact-person-profile");

institutionOtpBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const form = $("#institution_signup_form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  // Using the function to select specific fields
  const selectedData = selectFields(data, [
    "organisation_name",
    "organisation_website",
    "organisation_address",
    "nature_of_business",
    "number_of_users",
    "organisation_email",
    "organisation_phone",
    "country",
    "organisation_value",
    "state",
    "zip",
  ]);

  if (!allFields(selectedData)) {
    institutionBtn.textContent = "continue";
    institutionDetails.classList.add("show-error");
    setTimeout(() => {
      institutionDetails.classList.remove("show-error");
    }, 1500);
    return;
  }

  institutionOtpBtn.textContent = "Continue";
  institutionOtpSection.classList.remove("show");
  contactPersonSection.classList.add("show");
});

// check contact person's email

const contactSubmitBtn = $(".contactSubmitBtn");

contactSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  contactSubmitBtn.textContent = "Please Wait...";

  const form = $("#institution_signup_form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  // Using the function to select specific fields

  const selectedData = selectFields(data, [
    "organisation_name",
    "organisation_website",
    "organisation_address",
    "nature_of_business",
    "number_of_users",
    "organisation_email",
    "organisation_phone",
    "country",
    "organisation_value",
    "state",
    "zip",
    "name",
    "phone",
    "email",
    "product",
    "role",
    "password",
  ]);

  if (!allFields(selectedData)) {
    contactPersonSection.classList.add("show-error");
    contactPersonSection.querySelector("p").textContent =
      "All Fields are required";
    contactSubmitBtn.textContent = "Continue";
    setTimeout(() => {
      contactPersonSection.classList.remove("show-error");
      contactPersonSection.querySelector("p").textContent =
        "All fields are required";
    }, 1500);
    return;
  }

  let emailField = $('input[name="email"]');
  if (!validateEmail(emailField.value)) {
    contactPersonSection.classList.add("show-error");
    contactPersonSection.querySelector("p").textContent =
      "Please enter a correct email";
    contactSubmitBtn.textContent = "Continue";
    setTimeout(() => {
      contactPersonSection.classList.remove("show-error");
      contactPersonSection.querySelector("p").textContent =
        "All fields are required";
    }, 1500);
    return;
  }

  let passwordField = $('input[name="password"]');
  let confirmPasswordField = $('input[name="confirm_password"]');

  if (passwordField.value !== confirmPasswordField.value) {
    contactPersonSection.classList.add("show-error");
    contactPersonSection.querySelector("p").textContent =
      "Password didn't match";
    contactSubmitBtn.textContent = "Continue";
    setTimeout(() => {
      contactPersonSection.classList.remove("show-error");
      contactPersonSection.querySelector("p").textContent =
        "All fields are required";
    }, 1500);
    return;
  }

  if (!(passwordField.value.length >= 4)) {
    contactPersonSection.classList.add("show-error");
    contactPersonSection.querySelector("p").textContent =
      "Password must be atleast four(4) characters";
    contactSubmitBtn.textContent = "Continue";
    setTimeout(() => {
      contactPersonSection.classList.remove("show-error");
      contactPersonSection.querySelector("p").textContent =
        "All fields are required";
    }, 1500);
    return;
  }

  // send mail for verification

  const emailValue = $('input[name="email');

  fetch(`${API_URL}/${verifyMail}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(selectedData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response
      if (!data.success) {
        // Show OTP section
        contactPersonSection.classList.add("show-error");
        contactPersonSection.querySelector("p").textContent =
          "Email already taken";
        contactSubmitBtn.textContent = "Continue";
        setTimeout(() => {
          contactPersonSection.classList.remove("show-error");
          emailValue.value = "";
          contactPersonSection.querySelector("p").textContent =
            "All fields are required";
        }, 3000);
      } else {
        contactSubmitBtn.textContent = "Continue";
        contactPersonSection.classList.remove("show");
        contactpersonOtpSection.classList.add("show");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// otp section

const otpBtn = $(".otpBtn");
const otpError = $(".otpError");
otpBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const form = $("#institution_signup_form");
  const formData = new FormData(form);

  const data = Object.fromEntries(formData);
  // Using the function to select specific fields

  const selectedData = selectFields(data, [
    "organisation_name",
    "organisation_website",
    "organisation_address",
    "nature_of_business",
    "number_of_users",
    "organisation_email",
    "organisation_phone",
    "country",
    "organisation_value",
    "state",
    "zip",
    "name",
    "phone",
    "email",
    "product",
    "role",
    "password",
    "velification_code",
  ]);

  // verify the otp

  fetch(`${API_URL}/${verifyCode}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(selectedData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        otpBtn.textContent = "Continue";
        window.location.href = "index.html";
        // Redirect or perform further actions
      } else {
        otpBtn.textContent = "Continue";
        otpError.classList.add("text-danger");
        otpError.textContent = "Wrong OTP, Try again";

        setTimeout(() => {
          otpError.classList.remove("text-danger");
          otpError.textContent = "Enter OTP sent to your email";
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function selectFields(obj, fields) {
  return fields.reduce((accumulator, field) => {
    if (obj.hasOwnProperty(field)) {
      accumulator[field] = obj[field];
    }
    return accumulator;
  }, {});
}

// check if all form fields are filled
function allFields(formData) {
  for (let key in formData) {
    if (formData[key].trim() === "") {
      return false;
    }
  }
  return true;
}

// verify the email input
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
