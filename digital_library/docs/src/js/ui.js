const resultsContainer = document.getElementById("bookResults");

export function renderGoogleBooks(books) {
    resultsContainer.innerHTML = "";

    books.forEach(book => {
        const info = book.volumeInfo;

        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
      <img src="${info.imageLinks?.thumbnail || ''}" alt="${info.title}">
      <h3>${info.title}</h3>
      <p>${info.authors?.join(", ") || "Unknown author"}</p>
    `;

        resultsContainer.appendChild(card);
    });
}

export function renderOpenLibraryBooks(books) {
    resultsContainer.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author_name?.[0] || "Unknown author"}</p>
    `;

        resultsContainer.appendChild(card);
    });
}

export function renderBookRow(books, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    books.forEach(book => {
        const info = book.volumeInfo;

        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
      <img src="${info.imageLinks?.thumbnail || ""}" alt="${info.title}">
      <p class="book-title">${info.title}</p>
    `;

        container.appendChild(card);
    });
}