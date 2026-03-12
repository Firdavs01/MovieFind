import { searchMovies } from "./api.js";

function debounce(fn, delay) {
  let timer = null;

  return function(...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const debounceSearch = debounce(searchMovies, 500)

export {debounceSearch}