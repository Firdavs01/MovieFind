"use strict";

import {searchMovies}  from "./js/api.js";

import { buttonElement, inputElement} from "./js/uiElements.js";

import { debounceSearch } from "./js/debounce.js";


buttonElement.addEventListener("click", (e) => {
  const inputElementValue = inputElement.value;
  debounceSearch(inputElementValue)
  inputElement.value = ''
});


inputElement.addEventListener("keydown", (e) => {
  if (e.key === 'Enter') {
    const inputElementValue = inputElement.value;
    searchMovies(inputElementValue);
    inputElement.value = ''
  }
})

