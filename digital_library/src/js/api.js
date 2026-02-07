// GOOGLE BOOKS API
export async function getGoogleBooks(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=8`;
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
}

// OPEN LIBRARY SEARCH API
export async function searchOpenLibrary(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.docs || [];
}