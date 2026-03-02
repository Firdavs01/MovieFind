"use strict";

const inputElement = document.querySelector("#input");
const buttonElement = document.querySelector("#button");
const movieCardsElement = document.querySelector("#movie__cards");

function debounce(fn, delay) {
  let timer = null;

  return function(...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`,
    );

    if (!response.ok) return;

    const data = await response.json();
    const dataupd = data.map((item) => item.show);
    cartRender(dataupd);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const debounceSearch = debounce(searchMovies, 500)

function cartRender(movies) {
  movieCardsElement.innerHTML = ''

  movies.forEach((movie) => {
    const divS = document.createElement("div");
    divS.classList.add("card");

    divS.innerHTML = `
      <img src="${movie.image?.medium || ""}">
      <h3>${movie.name}</h3>
      <p>rating: ${movie.rating?.average || "N/A"}</p>
    `;

    divS.addEventListener("click", () => {
      renderModal(movie)
    })

    movieCardsElement.appendChild(divS);
  });
}

buttonElement.addEventListener("click", (e) => {
  const inputElementValue = inputElement.value;
  debounceSearch(inputElementValue)
  inputElement.value = ''
});

function renderModal(movie) {
  const oldModal = document.querySelector('.modal__info')
  if (oldModal) oldModal.remove()

  const modal = document.createElement('div')
  modal.classList.add('modal__info')

  modal.innerHTML = `
    <button id="closeBtn">X</button>
    <h3>The movie details:</h3>
    <p>Premiered: ${movie.premiered}</p>
  `
  document.body.appendChild(modal)

  const closeModalBtnElement = modal.querySelector("#closeBtn");

  closeModalBtnElement.addEventListener("click", () => {
    modal.remove()
  })
}

inputElement.addEventListener("keydown", (e) => {
  if (e.key === 'Enter') {
    const inputElementValue = inputElement.value;
    searchMovies(inputElementValue);
    inputElement.value = ''
  }
})