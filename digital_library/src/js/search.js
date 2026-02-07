import { searchOpenLibrary } from "./api.js";

export function initSearch() {
    document.getElementById("searchBtn").addEventListener("click", runSearch);
}

async function runSearch() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const content = document.getElementById("content");
    content.innerHTML = "<h2>Search Results</h2>";

    const books = await searchOpenLibrary(query);

    const grid = document.createElement("div");
    grid.className = "book-row";

    books.slice(0, 10).forEach(book => { 
        const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "";

        grid.innerHTML += `
      <div class="book-card">
        <img src="${cover}">
        <h3>${book.title}</h3>
        <p>${book.author_name?.join(", ") || "Unknown"}</p>
      </div>
    `;
    });

    content.appendChild(grid);
}