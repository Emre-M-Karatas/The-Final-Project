document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".input__btn");

  
  button.classList.remove("loading");

  button.addEventListener("click", () => {
    button.classList.add("loading");
  });
});
