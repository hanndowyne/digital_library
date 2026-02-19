(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f="https://corsproxy.io/?https://openlibrary.org";async function y(){const i=["fiction","romance","fantasy","science","history","mystery"];try{const r=i.map(t=>fetch(`${f}/search.json?q=${t}&limit=6`)),s=await Promise.all(r),o=await Promise.all(s.map(t=>{if(!t.ok)throw new Error("API Error");return t.json()}));let e=[];return o.forEach(t=>{t.docs&&(e=e.concat(t.docs))}),e}catch(r){return console.error("Error fetching home books:",r),[]}}async function L(i,r){try{const s=await fetch(`${f}/search.json?q=${encodeURIComponent(i)}&limit=20`,{signal:r});if(!s.ok)throw new Error("Search API Error");return(await s.json()).docs||[]}catch(s){return s.name!=="AbortError"&&console.error("Search error:",s),[]}}function u(i){i.innerHTML=`
    <section class="favorites-page">
      <h2> My Favorite Books</h2>
      <div class="favorites-grid" id="favorites-grid"></div>
    </section>
  `;const r=document.getElementById("favorites-grid"),s=JSON.parse(localStorage.getItem("favorites"))||[];if(s.length===0){r.innerHTML="<p>No favorites yet.</p>";return}r.innerHTML=s.map(o=>`
    <div class="card">
      <img 
        src="https://covers.openlibrary.org/b/id/${o.cover}-M.jpg"
        onerror="this.src='https://via.placeholder.com/150x220?text=No+Cover'"
      >
      <h3>${o.title}</h3>
      <p>${o.author}</p>
      <button class="remove-btn" data-title="${o.title}">
        Remove
      </button>
    </div>
  `).join(""),r.addEventListener("click",o=>{if(o.target.classList.contains("remove-btn")){const e=o.target.dataset.title;let t=JSON.parse(localStorage.getItem("favorites"))||[];t=t.filter(n=>n.title!==e),localStorage.setItem("favorites",JSON.stringify(t)),u(i)}})}function E(){const i=document.getElementById("searchBtn"),r=document.getElementById("searchInput");i.addEventListener("click",()=>s()),r.addEventListener("keydown",o=>{o.key==="Enter"&&s()});function s(){const o=r.value.trim();o&&$(o)}}async function $(i){const r=document.getElementById("app");r.innerHTML=`
    <section>
      <h2>Search Results for "${i}"</h2>
      <div id="search-grid" class="books-grid">
        <p>Searching...</p>
      </div>
    </section>

    <div id="bookModal" class="modal hidden">
      <div class="modal-content">
        <span id="closeModal">&times;</span>
        <div id="modalBody"></div>
      </div>
    </div>
  `;const s=document.getElementById("search-grid"),o=document.getElementById("bookModal"),e=document.getElementById("modalBody"),t=document.getElementById("closeModal");try{const n=await L(i);if(!n.length){s.innerHTML="<p>No books found.</p>";return}s.innerHTML=n.slice(0,20).map(a=>`
      <div class="card" data-key="${a.key}">
        <img 
          src="${a.cover_i?`https://covers.openlibrary.org/b/id/${a.cover_i}-M.jpg`:"https://via.placeholder.com/150x220?text=No+Cover"}"
        >
        <h3>${a.title}</h3>
        <p>${a.author_name?.[0]||"Unknown Author"}</p>

        <button class="fav-btn"
          data-title="${a.title}"
          data-author="${a.author_name?.[0]||"Unknown Author"}"
          data-cover="${a.cover_i||""}">
          Add to Favorites
        </button>
      </div>
    `).join("")}catch(n){console.error(n),s.innerHTML="<p>Failed to load results.</p>"}s.addEventListener("click",async n=>{if(n.target.classList.contains("fav-btn")){n.stopPropagation(),M(n.target);return}const a=n.target.closest(".card");if(!a)return;const c=a.dataset.key;e.innerHTML="<p>Loading...</p>",o.classList.remove("hidden");try{const d=await fetch(`https://openlibrary.org${c}.json`);if(!d.ok)throw new Error;const l=await d.json(),p=typeof l.description=="string"?l.description:l.description?.value||"No description available.";e.innerHTML=`
        <h2>${l.title}</h2>
        <p>${p.substring(0,600)}</p>
      `}catch{e.innerHTML="<p>Failed to load description.</p>"}}),t.addEventListener("click",()=>o.classList.add("hidden")),window.addEventListener("click",n=>{n.target===o&&o.classList.add("hidden")})}function M(i){const r=i.dataset.title,s=i.dataset.author,o=i.dataset.cover;let e=JSON.parse(localStorage.getItem("favorites"))||[];e.some(n=>n.title===r)?alert("Already in favorites ⚠️"):(e.push({title:r,author:s,cover:o}),localStorage.setItem("favorites",JSON.stringify(e)),alert("Book added to favorites ✅"))}const m=document.getElementById("app");function v(i){m.innerHTML="",i==="favorites"?u(m):B()}async function B(){m.innerHTML=`
    <section>
      <h2>Home Library</h2>
      <div id="books-list" class="books-grid"></div>
    </section>

    <div id="bookModal" class="modal hidden">
      <div class="modal-content">
        <span id="closeModal">&times;</span>
        <div id="modalBody"></div>
      </div>
    </div>
  `;const i=document.getElementById("books-list"),r=document.getElementById("bookModal"),s=document.getElementById("modalBody"),o=document.getElementById("closeModal");i.innerHTML="<p>Loading books...</p>";try{const e=await y();i.innerHTML=e.map(t=>`
      <div class="card" data-key="${t.key}">
        <img 
          src="${t.cover_i?`https://covers.openlibrary.org/b/id/${t.cover_i}-M.jpg`:"https://via.placeholder.com/150x220?text=No+Cover"}"
        >
        <h3>${t.title}</h3>
        <p><strong>Author:</strong> ${t.author_name?.[0]||"Unknown"}</p>
        <p><strong>First Published:</strong> ${t.first_publish_year||"N/A"}</p>
        <p><strong>Editions:</strong> ${t.edition_count||"N/A"}</p>
        <p><strong>Language:</strong> ${t.language?.[0]||"N/A"}</p>
        <button class="fav-btn"
          data-title="${t.title}"
          data-author="${t.author_name?.[0]||"Unknown"}"
          data-cover="${t.cover_i||""}"
          data-year="${t.first_publish_year||""}"
          data-editions="${t.edition_count||""}">
          Add to Favorites
        </button>
      </div>
    `).join("")}catch{i.innerHTML="<p>Failed to load books.</p>"}i.addEventListener("click",async e=>{if(e.target.classList.contains("fav-btn")){e.stopPropagation();const a=e.target.dataset.title,c=e.target.dataset.author,d=e.target.dataset.cover,l=e.target.dataset.year,p=e.target.dataset.editions;let h=JSON.parse(localStorage.getItem("favorites"))||[];h.some(g=>g.title===a)?alert("Already in favorites."):(h.push({title:a,author:c,cover:d,year:l,editions:p}),localStorage.setItem("favorites",JSON.stringify(h)),alert("Book added to favorites!"));return}const t=e.target.closest(".card");if(!t)return;const n=t.dataset.key;s.innerHTML="<p>Loading...</p>",r.classList.remove("hidden");try{const c=await(await fetch(`https://corsproxy.io/?https://openlibrary.org${n}.json`)).json(),d=typeof c.description=="string"?c.description:c.description?.value||"No description available.";s.innerHTML=`
        <h2>${c.title}</h2>
        <p>${d}</p>
      `}catch{s.innerHTML="<p>Failed to load details.</p>"}}),o.addEventListener("click",()=>{r.classList.add("hidden")}),window.addEventListener("click",e=>{e.target===r&&r.classList.add("hidden")})}document.getElementById("homeBtn").addEventListener("click",()=>{v("home")});document.getElementById("favoritesBtn").addEventListener("click",()=>{v("favorites")});v("home");E();
