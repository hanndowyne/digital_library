(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();async function i(o){const n=`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(o)}&maxResults=8`;return(await(await fetch(n)).json()).items||[]}async function d(o){const n=`https://openlibrary.org/search.json?q=${encodeURIComponent(o)}`;return(await(await fetch(n)).json()).docs||[]}async function l(){const o=document.getElementById("content");o.innerHTML="";const n=await i("subject:fiction");a("📚 Featured Books",n,o);const c=await i("bestseller");a("🔥 Trending Now",c,o)}function a(o,n,c){const r=document.createElement("section");r.className="book-section",r.innerHTML=`<h2>${o}</h2><div class="book-row"></div>`;const e=r.querySelector(".book-row");n.forEach(t=>{const s=t.volumeInfo;e.innerHTML+=`
      <div class="book-card">
        <img src="${s.imageLinks?.thumbnail||""}">
        <h3>${s.title}</h3>
        <p>${s.authors?.join(", ")||"Unknown"}</p>
      </div>
    `}),c.appendChild(r)}function u(){document.getElementById("searchBtn").addEventListener("click",m)}async function m(){const o=document.getElementById("searchInput").value.trim();if(!o)return;const n=document.getElementById("content");n.innerHTML="<h2>Search Results</h2>";const c=await d(o),r=document.createElement("div");r.className="book-row",c.slice(0,10).forEach(e=>{const t=e.cover_i?`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=10`:"";r.innerHTML+=`
      <div class="book-card">
        <img src="${t}">
        <h3>${e.title}</h3>
        <p>${e.author_name?.join(", ")||"Unknown"}</p>
      </div>
    `}),n.appendChild(r)}document.addEventListener("DOMContentLoaded",()=>{l(),u()});
