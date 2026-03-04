import {cartRender} from "./render.js";

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

export {searchMovies}