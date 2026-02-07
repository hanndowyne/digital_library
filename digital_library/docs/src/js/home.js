import { getGoogleBooks } from "./api.js";

export async function loadHome() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const featured = await getGoogleBooks("subject:fiction");
  renderSection("📚 Featured Books", featured, content);

  const trending = await getGoogleBooks("bestseller");
  renderSection("🔥 Trending Now", trending, content);
}

function renderSection(title, books, container) {
  const section = document.createElement("section");
  section.className = "book-section";

  section.innerHTML = `<h2>${title}</h2><div class="book-row"></div>`;
  const row = section.querySelector(".book-row");

  books.forEach(book => {
    const info = book.volumeInfo;
    row.innerHTML += `
      <div class="book-card">
        <img src="${info.imageLinks?.thumbnail || ''}">
        <h3>${info.title}</h3>
        <p>${info.authors?.join(", ") || "Unknown"}</p>
      </div>
    `;
  });

  container.appendChild(section);
}