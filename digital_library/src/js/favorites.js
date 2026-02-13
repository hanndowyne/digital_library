const display = document.querySelector("#favorites-list");

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    display.innerHTML = "<p>No favorite books yet.</p>";
    return;
  }

  display.innerHTML = favorites.map(book => `
    <div class="card">
      <img src="https://covers.openlibrary.org/b/id/${book.cover}-M.jpg">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <button class="remove-btn" data-title="${book.title}">
        ❌ Remove
      </button>
    </div>
  `).join("");
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(book =>
      book.title !== e.target.dataset.title
    );

    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
});

loadFavorites();