import { API_URL, LOGOUT_ADMINISTRATORS } from "./constants.js";

const logout = document.querySelector(".logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  // Corrected single quotes inside the innerHTML
  logout.innerHTML = '<i id="logout" class="bi bi-box-arrow-right"></i> Logout';

  const data = JSON.parse(localStorage.getItem("activeUser"));
  localStorage.clear("activeUser");

  fetch(`${API_URL}/${LOGOUT_ADMINISTRATORS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      // Changed to use single quotes for innerHTML
      logout.innerHTML =
        '<i id="logout" class="bi bi-box-arrow-right"></i> Wait...';
      console.log(data);
    })
    .catch((error) => {
      window.location.href = "index.html";
    });
});
