export async function fetchHomeBooks() {
    const genres = [
        "fiction",
        "romance",
        "fantasy",
        "science",
        "history",
        "mystery"
    ];

    let allBooks = [];

    for (let genre of genres) {
        const res = await fetch(
            `https://openlibrary.org/search.json?q=${genre}`
        );

        const data = await res.json();
        allBooks = allBooks.concat(data.docs.slice(0, 5));
    }

    return allBooks;
}