document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".input__btn");

  // HARD RESET on page load
  button.classList.remove("loading");

  button.addEventListener("click", () => {
    button.classList.add("loading");
  });
});
