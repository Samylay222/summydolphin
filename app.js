// app.js
const qEl = document.getElementById("q");
const genreEl = document.getElementById("genre");
const tagEl = document.getElementById("tag");
const gridEl = document.getElementById("grid");
const countEl = document.getElementById("count");
const pageInfoEl = document.getElementById("pageInfo");
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");

const PAGE_SIZE = 24;
let page = 1;

function uniq(arr) {
  return Array.from(new Set(arr)).sort((a,b)=>a.localeCompare(b));
}

function populateFilters() {
  const genres = uniq(window.GAMES.map(g => g.genre));
  const tags = uniq(window.GAMES.flatMap(g => g.tags));

  for (const g of genres) {
    const opt = document.createElement("option");
    opt.value = g; opt.textContent = g;
    genreEl.appendChild(opt);
  }

  for (const t of tags) {
    const opt = document.createElement("option");
    opt.value = t; opt.textContent = t;
    tagEl.appendChild(opt);
  }
}

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function filterGames() {
  const q = normalize(qEl.value);
  const genre = genreEl.value;
  const tag = tagEl.value;

  return window.GAMES.filter(g => {
    const hay = normalize(`${g.title} ${g.genre} ${g.tags.join(" ")} ${g.description}`);
    const matchQ = !q || hay.includes(q);
    const matchGenre = !genre || g.genre === genre;
    const matchTag = !tag || g.tags.includes(tag);
    return matchQ && matchGenre && matchTag;
  });
}

function renderCard(game) {
  const tags = game.tags.map(t => `<span class="badge">${t}</span>`).join("");
  const safeLink = game.link || "#";
  return `
    <article class="card">
      <h3>${game.title}</h3>
      <div class="badges">
        <span class="badge" style="border-color: rgba(122,162,255,.5)">${game.genre}</span>
        ${tags}
      </div>
      <p>${game.description}</p>
      <a class="play" href="${safeLink}" target="_blank" rel="noopener">Open</a>
    </article>
  `;
}

function render() {
  const filtered = filterGames();
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  page = Math.min(page, totalPages);

  const start = (page - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);

  gridEl.innerHTML = slice.map(renderCard).join("");

  countEl.textContent = `${total} games`;
  pageInfoEl.textContent = `Page ${page} / ${totalPages}`;

  prevEl.disabled = page <= 1;
  nextEl.disabled = page >= totalPages;
}

function resetAndRender() {
  page = 1;
  render();
}

qEl.addEventListener("input", resetAndRender);
genreEl.addEventListener("change", resetAndRender);
tagEl.addEventListener("change", resetAndRender);

prevEl.addEventListener("click", () => { page = Math.max(1, page - 1); render(); });
nextEl.addEventListener("click", () => { page = page + 1; render(); });

populateFilters();
render();
