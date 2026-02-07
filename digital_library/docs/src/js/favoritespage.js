import { getData } from "./storage.js";

const favorites = getData("favorites");
const container = document.getElementById("favoritesList");

container.innerHTML = favorites.length
    ? favorites.map(book => `
    <div class="book-card">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
    </div>
  `).join("")
    : "<p>No favorites yet ❤️</p>";