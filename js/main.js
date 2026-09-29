(function () {
  "use strict";
  const { categories, products } = window.ELITE;
  const $ = s => document.querySelector(s);
  const eur = n => new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", useGrouping: "always" }).format(n);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mobile = window.matchMedia("(max-width: 900px)");
  const KEY = "elite-cart";

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}"), out = {};
      Object.keys(raw).forEach(id => { const p = products.find(x => x.id == id); if (p && p.stock && raw[id] > 0) out[id] = raw[id] | 0; });
      return out;
    } catch (e) { return {}; }
  }
  const saveCart = () => { try { localStorage.setItem(KEY, JSON.stringify(state.cart)); } catch (e) {} };
  const state = { groups: null, label: "Todos", query: "", cart: loadCart() };
  const allGroups = [...new Set(products.map(p => p.cat))];
  const groupsFor = subs => allGroups.filter(g => subs.some(s => g.toLowerCase().startsWith(s.toLowerCase())));

  // ---- Componentes reutilizáveis ----
  const NavItem = c => `<li><a class="top" href="#produtos" data-cat="${c.id}">${c.name}</a><div class="dropdown"><a href="#produtos" data-cat="${c.id}">Ver tudo</a>${c.subs.map(s => `<a href="#produtos" data-sub="${esc(s)}">${esc(s)}</a>`).join("")}</div></li>`;
  const CatCard = c => `<a class="cat" href="#produtos" data-cat="${c.id}"><h3>${c.name}</h3><p>${c.subs.slice(0, 3).join(" · ")}</p></a>`;
  const ProductCard = p => `<article class="card"><div class="img" role="img" aria-label="Marca ${esc(p.brand)}">${p.old ? `<span class="tag">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : ""}${esc(p.brand)}</div>
<div class="body"><small>${esc(p.cat)}<br>Ref. ${esc(p.ref)}</small><h3>${esc(p.name)}</h3>
<span class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "Disponível" : "Esgotado"}</span>
<div class="price">${eur(p.price)}${p.old ? `<s aria-label="preço anterior">${eur(p.old)}</s>` : ""}</div>
<button class="btn" data-add="${p.id}" ${p.stock ? "" : "disabled"}>${p.stock ? "Adicionar ao carrinho" : "Esgotado"}</button></div></article>`;

  function setFilter(groups, label) { state.groups = groups; state.label = label; state.query = ""; $("#q").value = ""; renderFilters(); renderProducts(); }

  function renderFilters() {
    const pressed = g => (g === null ? !state.groups : !!state.groups && state.groups.length === 1 && state.groups[0] === g);
    $("#filters").innerHTML = [null, ...allGroups].map(g => `<button class="chip" aria-pressed="${pressed(g)}" data-f="${g === null ? "__all" : esc(g)}">${g === null ? "Todos" : esc(g)}</button>`).join("");
  }
  function renderProducts() {
    const q = state.query.toLowerCase();
    const list = products.filter(p => (!state.groups || state.groups.includes(p.cat)) && (!q || `${p.name} ${p.brand} ${p.ref}`.toLowerCase().includes(q)));
    $("#count-info").textContent = `${list.length} ${list.length === 1 ? "produto" : "produtos"}${state.groups ? " em " + state.label : ""}`;
    $("#grid").innerHTML = list.length ? list.map(ProductCard).join("")
      : `<div class="empty"><p>${state.query ? `Sem resultados para «${esc(state.query)}».` : `Ainda não há produtos de «${esc(state.label)}» nesta demonstração.`}</p><button class="chip" data-f="__all">Ver todos os produtos</button></div>`;
  }
  function renderCart() {
    const items = Object.keys(state.cart).map(id => ({ p: products.find(x => x.id == id), q: state.cart[id] })).filter(x => x.p);
    $("#count").textContent = items.reduce((s, x) => s + x.q, 0);
    $("#cart-list").innerHTML = items.length
      ? items.map(({ p, q }) => `<li><span>${q}× ${esc(p.name.slice(0, 44))}…</span><span><b>${eur(p.price * q)}</b><button data-rm="${p.id}" aria-label="Remover ${esc(p.name)}">Remover</button></span></li>`).join("")
      : `<li>O seu carrinho está vazio.</li>`;
    $("#total").textContent = eur(items.reduce((s, x) => s + x.p.price * x.q, 0));
  }

  // ---- Gaveta do carrinho (foco gerido) ----
  function openDrawer() { $("#drawer").classList.add("open"); $("#cart-close").focus(); $("#cart-btn").setAttribute("aria-expanded", "true"); }
  function closeDrawer(restore) {
    const d = $("#drawer"); if (!d.classList.contains("open")) return;
    d.classList.remove("open"); $("#cart-btn").setAttribute("aria-expanded", "false"); if (restore) $("#cart-btn").focus();
  }
  function closeMenu() { $("#nav").classList.remove("open"); $("#menu-btn").setAttribute("aria-expanded", "false"); document.querySelectorAll(".nav li.open").forEach(li => li.classList.remove("open")); }

  // ---- Arranque ----
  $("#nav-list").innerHTML = categories.map(NavItem).join("");
  $("#cats").innerHTML = categories.map(CatCard).join("");
  $("#year").textContent = new Date().getFullYear();
  renderFilters(); renderProducts(); renderCart();

  document.addEventListener("click", e => {
    const top = e.target.closest(".nav a.top");
    if (top && mobile.matches) { e.preventDefault(); const li = top.parentElement, was = li.classList.contains("open"); document.querySelectorAll(".nav li.open").forEach(x => x.classList.remove("open")); li.classList.toggle("open", !was); return; }
    const t = e.target.closest("[data-f],[data-add],[data-rm],[data-cat],[data-sub],#cart-btn,#cart-close,#menu-btn,#checkout");
    if (!t) return;
    if (t.dataset.f) { const all = t.dataset.f === "__all"; setFilter(all ? null : [t.dataset.f], all ? "Todos" : t.dataset.f); }
    else if (t.dataset.cat) { const c = categories.find(x => x.id === t.dataset.cat); setFilter(groupsFor(c.subs), c.name); closeMenu(); }
    else if (t.dataset.sub) { setFilter(groupsFor([t.dataset.sub]), t.dataset.sub); closeMenu(); }
    else if (t.dataset.add) { const id = t.dataset.add; state.cart[id] = (state.cart[id] || 0) + 1; saveCart(); renderCart(); $("#cart-msg").textContent = ""; openDrawer(); }
    else if (t.dataset.rm) { delete state.cart[t.dataset.rm]; saveCart(); renderCart(); }
    else if (t.id === "cart-btn") { $("#drawer").classList.contains("open") ? closeDrawer(true) : openDrawer(); }
    else if (t.id === "cart-close") closeDrawer(true);
    else if (t.id === "menu-btn") { const o = $("#nav").classList.toggle("open"); t.setAttribute("aria-expanded", String(o)); }
    else if (t.id === "checkout") $("#cart-msg").textContent = Object.keys(state.cart).length ? "Demonstração: o checkout não está implementado." : "Adicione um produto primeiro.";
  });
  $("#search").addEventListener("submit", e => {
    e.preventDefault(); const q = $("#q").value.trim();
    state.groups = null; state.label = "Todos"; state.query = q; renderFilters(); renderProducts();
    $("#produtos").scrollIntoView();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(true); closeMenu(); } });
  mobile.addEventListener("change", closeMenu);
})();
