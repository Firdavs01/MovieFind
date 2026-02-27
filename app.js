"use strict";

const inputElement = document.querySelector("#input");
const buttonElement = document.querySelector("#button");
const movieCardsElement = document.querySelector("#movie__cards");
// const closeModalBtnElement = document.querySelector("#closeModalBtn");

async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`,
    );
    if (!response) return;

    const data = await response.json();
    const dataupd = data.map((item) => item.show);
    cartRender(dataupd);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function cartRender(movies) {
  movieCardsElement.innerHTML = ''

  const div = document.createElement("div");
  movies.forEach((movie) => {
    const divS = document.createElement("div");
    divS.classList.add("card");

    divS.innerHTML = `
        <img src="${movie.image.medium}">
        <h3>${movie.name}</h3>
        <p>rating: ${movie.rating.average}</p>
    `;

    div.appendChild(divS);
  });

  // div.addEventListener("click", () => {
  //   renderModal(movies[i].show)
  // })
  movieCardsElement.appendChild(div);
}

buttonElement.addEventListener("click", () => {
  const inputElementValue = inputElement.value;
  searchMovies(inputElementValue);
  inputElement.value = ''
});

// function renderModal(movie) {
//   const modal = document.createElement('div')
//   modal.classList.add('modal__info')
//   movie.forEach(movieDetails => {
//     modal.innerHTML = `
//       <button id="closeModalBtn">X</button>
//       <h3>The movie details:</h3>
//       <p>Premiered: ${movieDetails.premiered}</p>
//     `
//   })
//   closeModalBtnElement.addEventListener("click", () => {
//     modal.remove()
//   })
//   document.body.appendChild(modal)
// }