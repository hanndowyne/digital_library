(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();async function p(){const o=["fiction","romance","fantasy","science","history","mystery"];let e=[];for(let a of o){const t=await(await fetch(`https://openlibrary.org/search.json?q=${a}`)).json();e=e.concat(t.docs.slice(0,5))}return e}const i=document.querySelector("#books-list"),c=document.getElementById("bookModal"),d=document.getElementById("modalBody"),f=document.getElementById("closeModal");async function u(){i.innerHTML="<p>Loading books...</p>";try{const o=await p();i.innerHTML=o.map(e=>`
      <div class="card" data-key="${e.key}">
          <img 
              src="https://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg" 
              alt="${e.title}"
              onerror="this.src='https://via.placeholder.com/150x220?text=No+Cover'"
          >
          <h3>${e.title}</h3>
          <p>${e.author_name?.[0]||"Unknown Author"}</p>
          <button class="fav-btn"
              data-title="${e.title}"
              data-author="${e.author_name?.[0]||"Unknown Author"}"
              data-cover="${e.cover_i}">
              ❤️ Add to Favorites
          </button>
      </div>
    `).join("")}catch(o){i.innerHTML="<p>❌ Failed to load books.</p>",console.error(o)}}u();i.addEventListener("click",async o=>{if(o.target.classList.contains("fav-btn")){o.stopPropagation();const s=o.target.dataset.title,t=o.target.dataset.author,r=o.target.dataset.cover;let n=JSON.parse(localStorage.getItem("favorites"))||[];n.some(l=>l.title===s)?alert("Book already in favorites"):(n.push({title:s,author:t,cover:r}),localStorage.setItem("favorites",JSON.stringify(n)),alert("Book added to favorites ❤️"));return}const e=o.target.closest(".card");if(!e)return;const a=e.dataset.key;try{d.innerHTML="<p>Loading description...</p>",c.classList.remove("hidden");const t=await(await fetch(`https://openlibrary.org${a}.json`)).json(),r=typeof t.description=="string"?t.description:t.description?.value||"No description available.";d.innerHTML=`
      <h2>${t.title}</h2>
      <p>${r}</p>
    `}catch{d.innerHTML="<p>❌ Failed to load description.</p>"}});f.addEventListener("click",()=>{c.classList.add("hidden")});window.addEventListener("click",o=>{o.target===c&&c.classList.add("hidden")});
