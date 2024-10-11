const isLoggedIn = localStorage.getItem("activeUser");

if (!isLoggedIn) {
  window.location.href = "/index.html";
}
