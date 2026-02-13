import { fetchHomeBooks } from "./js/api.js";

const display = document.querySelector("#books-list");
const modal = document.getElementById("bookModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

/* ===============================
   LOAD HOME BOOKS
================================= */
async function loadHomeBooks() {
  display.innerHTML = "<p>Loading books...</p>";

  try {
    const books = await fetchHomeBooks();

    display.innerHTML = books.map(book => `
      <div class="card" data-key="${book.key}">
          <img 
              src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" 
              alt="${book.title}"
              onerror="this.src='https://via.placeholder.com/150x220?text=No+Cover'"
          >
          <h3>${book.title}</h3>
          <p>${book.author_name?.[0] || "Unknown Author"}</p>
          <button class="fav-btn"
              data-title="${book.title}"
              data-author="${book.author_name?.[0] || "Unknown Author"}"
              data-cover="${book.cover_i}">
              ❤️ Add to Favorites
          </button>
      </div>
    `).join("");

  } catch (error) {
    display.innerHTML = "<p>❌ Failed to load books.</p>";
    console.error(error);
  }
}

loadHomeBooks();

/* ===============================
   CLICK EVENTS (ONE LISTENER ONLY)
================================= */
display.addEventListener("click", async (e) => {

  /* ========= ADD TO FAVORITES ========= */
  if (e.target.classList.contains("fav-btn")) {

    e.stopPropagation(); // prevent modal opening

    const title = e.target.dataset.title;
    const author = e.target.dataset.author;
    const cover = e.target.dataset.cover;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(book => book.title === title);

    if (!exists) {
      favorites.push({ title, author, cover });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Book added to favorites ❤️");
    } else {
      alert("Book already in favorites");
    }

    return;
  }

  /* ========= OPEN MODAL ========= */
  const card = e.target.closest(".card");
  if (!card) return;

  const workKey = card.dataset.key;

  try {
    modalBody.innerHTML = "<p>Loading description...</p>";
    modal.classList.remove("hidden");

    const res = await fetch(`https://openlibrary.org${workKey}.json`);
    const data = await res.json();

    const description =
      typeof data.description === "string"
        ? data.description
        : data.description?.value || "No description available.";

    modalBody.innerHTML = `
      <h2>${data.title}</h2>
      <p>${description}</p>
    `;

  } catch (error) {
    modalBody.innerHTML = "<p>❌ Failed to load description.</p>";
  }
});

/* ===============================
   MODAL CLOSE
================================= */
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});