import { loadHome } from "./home.js";
import { initSearch } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHome();
  initSearch();
});