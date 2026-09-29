import { categories, products } from "../data/products.js";

const $ = (s, el = document) => el.querySelector(s);
const eur = n => new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(n);
const state = { filter: "Todos", query: "", cart: [] };

// Componentes reutilizáveis
const NavItem = c => `<li><a class="top" href="#${c.id}">${c.name}</a><div class="dropdown">${c.subs.map(s => `<a href="#produtos" data-sub="${s}">${s}</a>`).join("")}</div></li>`;
const CatCard = c => `<a class="cat" href="#produtos" data-sub="${c.subs[0]}"><h3>${c.name}</h3><p>${c.subs.slice(0, 3).join(" · ")}</p></a>`;
const ProductCard = p => `<article class="card"><div class="img" role="img" aria-label="${p.brand}">${p.old ? `<span class="tag">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : ""}${p.brand}</div>
<div class="body"><small>${p.cat} · ${p.ref}</small><h3>${p.name}</h3>
<span class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "Disponível" : "Esgotado"}</span>
<div class="price">${eur(p.price)}${p.old ? `<s>${eur(p.old)}</s>` : ""}</div>
<button class="btn" data-add="${p.id}" ${p.stock ? "" : "disabled"}>${p.stock ? "Adicionar" : "Esgotado"}</button></div></article>`;

const groups = ["Todos", ...new Set(products.map(p => p.cat))];

function renderProducts() {
  const q = state.query.toLowerCase();
  const list = products.filter(p =>
    (state.filter === "Todos" || p.cat === state.filter) &&
    (!q || `${p.name} ${p.brand} ${p.ref}`.toLowerCase().includes(q)));
  $("#grid").innerHTML = list.length ? list.map(ProductCard).join("") : `<p class="empty">Sem resultados. Experimente outra pesquisa ou filtro.</p>`;
}
function renderFilters() {
  $("#filters").innerHTML = groups.map(c => `<button class="chip" aria-pressed="${c === state.filter}" data-f="${c}">${c}</button>`).join("");
}
function renderCart() {
  $("#count").textContent = state.cart.length;
  $("#cart-list").innerHTML = state.cart.length
    ? state.cart.map(p => `<li><span>${p.name.slice(0, 48)}…</span><b>${eur(p.price)}</b></li>`).join("")
    : `<li>O seu carrinho está vazio.</li>`;
  $("#total").textContent = eur(state.cart.reduce((s, p) => s + p.price, 0));
}
function applySub(sub) {
  const key = sub.split(" ")[0].toLowerCase();
  state.filter = groups.find(g => g.toLowerCase().includes(key)) || "Todos";
  renderFilters(); renderProducts();
}

$("#nav-list").innerHTML = categories.map(NavItem).join("");
$("#cats").innerHTML = categories.map(CatCard).join("");
$("#year").textContent = new Date().getFullYear();
renderFilters(); renderProducts(); renderCart();

document.addEventListener("click", e => {
  const t = e.target.closest("[data-f],[data-add],[data-sub],#cart-btn,#cart-close,#menu-btn");
  if (!t) return;
  if (t.dataset.f) { state.filter = t.dataset.f; renderFilters(); renderProducts(); }
  else if (t.dataset.add) { state.cart.push(products.find(p => p.id == t.dataset.add)); renderCart(); $("#drawer").classList.add("open"); }
  else if (t.dataset.sub) applySub(t.dataset.sub);
  else if (t.id === "cart-btn") $("#drawer").classList.toggle("open");
  else if (t.id === "cart-close") $("#drawer").classList.remove("open");
  else if (t.id === "menu-btn") t.setAttribute("aria-expanded", $("#nav").classList.toggle("open"));
});
$("#search").addEventListener("submit", e => { e.preventDefault(); state.query = $("#q").value.trim(); renderProducts(); location.hash = "produtos"; });
document.addEventListener("keydown", e => e.key === "Escape" && $("#drawer").classList.remove("open"));
