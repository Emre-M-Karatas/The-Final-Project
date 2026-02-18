let currentMovies = [];
let moviesList = null;
let loadingSection = null;
let searchResultText = null;
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ---------- SORTING ---------- */
const filter = document.querySelector("#filter");

if (filter) {
  filter.addEventListener("change", () => {
    sortMovies(filter.value);
  });
}

function sortMovies(type) {
  let sortedMovies = [...currentMovies];

  if (type === "A_to_Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  if (type === "Z_to_A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  if (type === "Newest_to_Oldest") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  }

  if (type === "Oldest_to_Newest") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }

  renderMovies(sortedMovies);
}

/* ---------- FETCH ---------- */
async function fetchMovies(searchValue) {
  if (loadingSection) {
    loadingSection.classList.add("active");
  }

  if (moviesList) {
    moviesList.innerHTML = "";
  }

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=64034610&s=${searchValue}`
  );

  const data = await response.json();

 
  await wait(1000);

  currentMovies = data.Search || [];
  renderMovies(currentMovies);

  if (loadingSection) {
    loadingSection.classList.remove("active");
  }
}

/* ---------- RENDER ---------- */
function renderMovies(movies) {
  if (!moviesList) return;

  moviesList.innerHTML = "";

  for (let movie of movies) {
    moviesList.innerHTML += `
      <div class="movie">
        <img src="${
          movie.Poster !== "N/A"
            ? movie.Poster
            : "./assest/no-image.png"
        }" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;
  }
}

/* ---------- PAGE LOGIC ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".input__btn");
  const input = document.querySelector(".search__bar");
  const movieInput = document.querySelector(".input__movies");
  searchResultText = document.querySelector(".filter__title span");
  moviesList = document.querySelector(".movies__list");
  loadingSection = document.querySelector(".loading");

  // MAIN PAGE
 if (button && input && !moviesList) {
  const goToMoviePage = () => {
    const searchValue = input.value.trim();
    if (!searchValue) return;
    window.location.href = `movie.html?search=${searchValue}`;
  };
  button.addEventListener("click", goToMoviePage);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      goToMoviePage();
    }
  });
}

  // MOVIE PAGE (URL SEARCH)
  if (moviesList) {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("search");

    const searchResultText = document.querySelector(".filter__title span");

    if (searchResultText && searchValue) {
      searchResultText.textContent = `"${searchValue}"`;
    }

    if (searchValue) {
      fetchMovies(searchValue);
    }
  } 

  // MOVIE PAGE (RE-SEARCH)
  if (movieInput && moviesList) {
  movieInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const searchValue = movieInput.value.trim();
      if (!searchValue) return;

      // ✅ update title text
      if (searchResultText) {
        searchResultText.textContent = `"${searchValue}"`;
      }

      fetchMovies(searchValue);
    }
  });
}
});