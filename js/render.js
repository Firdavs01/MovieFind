import { movieCardsElement } from "./uiElements.js";

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

export {
  cartRender
}