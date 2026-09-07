const y = ({ inItems: p = [], inOnAction: e } = {}) => {
  const t = p, l = e, c = document.createElement("ul");
  return c.className = "nav d-none d-md-flex align-items-center my-1 text-small text-center", t.forEach((a) => {
    const i = document.createElement("li"), n = document.createElement("a");
    n.href = a.href || "#";
    const o = a.active ? "active text-primary" : a.class || "text-white";
    n.className = `nav-link px-3 ${o}`, a.id && (n.id = `menu-desktop-${a.id}`, n.setAttribute("data-item-id", a.id)), a.title && (n.title = a.title);
    let s = "";
    if (a.icon) {
      const d = a.active ? "text-primary" : "";
      s += `<i class="bi ${a.icon} d-block mx-auto mb-1 fs-5 ${d}"></i>`;
    }
    s += `<span>${a.label || ""}</span>`, n.innerHTML = s, (a.isAction || typeof l == "function") && n.addEventListener("click", (d) => {
      typeof l == "function" && l({ inItem: a, inEvent: d });
    }), i.appendChild(n), c.appendChild(i);
  }), c;
}, k = ({ inItems: p = [], inCollapseId: e = "mobileNavCollapse", inOnAction: t } = {}) => {
  const l = p, c = e, a = t, i = document.createElement("div");
  i.className = "collapse d-md-none", i.id = c;
  const n = document.createElement("div");
  n.className = "container-fluid px-2 pt-3 pb-2 border-top border-secondary mt-2";
  const o = document.createElement("div");
  return o.className = "row row-cols-3 g-2 text-center text-small", l.forEach((s) => {
    const d = document.createElement("div");
    d.className = "col";
    const r = document.createElement("a");
    r.href = s.href || "#";
    const m = s.active ? "border-primary" : s.id === "reset" ? "border-info" : "border-secondary";
    r.className = `nav-link py-2 rounded bg-dark border ${m} text-white`, s.id && (r.id = `menu-mobile-${s.id}`, r.setAttribute("data-item-id", s.id));
    let b = "";
    if (s.icon) {
      const h = s.active ? "text-primary" : s.id === "reset" ? "text-info" : "text-white";
      b += `<i class="bi ${s.icon} d-block mx-auto mb-1 fs-4 ${h}"></i>`;
    }
    const u = s.active ? "text-primary fw-semibold" : s.id === "reset" ? "text-info" : "text-white";
    b += `<span class="${u}">${s.label || ""}</span>`, r.innerHTML = b, (s.isAction || typeof a == "function") && r.addEventListener("click", (h) => {
      typeof a == "function" && a({ inItem: s, inEvent: h });
    }), d.appendChild(r), o.appendChild(d);
  }), n.appendChild(o), i.appendChild(n), i;
}, I = ({ inSubHeader: p = {}, inOnAction: e } = {}) => {
  const t = p, l = e;
  if (!t || !t.status && !t.actions)
    return null;
  const c = document.createElement("div");
  c.className = "px-3 py-2 border-bottom bg-white";
  const a = document.createElement("div");
  if (a.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-between gap-2", t.status) {
    const i = document.createElement("div");
    if (i.className = "d-flex align-items-center", t.status.label) {
      const o = document.createElement("span");
      o.className = "text-secondary small me-2", o.textContent = t.status.label, i.appendChild(o);
    }
    const n = document.createElement("span");
    n.id = t.status.id || "record-count-badge", n.className = t.status.badgeClass || "badge bg-secondary", n.textContent = t.status.badgeText || "Ready", i.appendChild(n), a.appendChild(i);
  }
  if (Array.isArray(t.actions) && t.actions.length > 0) {
    const i = document.createElement("div");
    i.className = "d-flex gap-2", t.actions.forEach((n) => {
      const o = document.createElement("button");
      o.type = "button", o.id = n.id || "", o.className = n.class || "btn btn-sm btn-primary", n.title && (o.title = n.title);
      let s = "";
      n.icon && (s += `<i class="bi ${n.icon} me-1"></i> `), s += n.label || "", o.innerHTML = s, o.addEventListener("click", (d) => {
        typeof l == "function" && l({ inAction: n, inEvent: d });
      }), i.appendChild(o);
    }), a.appendChild(i);
  }
  return c.appendChild(a), c;
}, N = ({ inMenu: p } = {}) => {
  const e = p, t = typeof (e == null ? void 0 : e.containerId) == "string" ? document.getElementById(e.containerId) : e == null ? void 0 : e.containerId;
  if (!t)
    return console.warn(`[json-to-dom-menu] Container '#${e == null ? void 0 : e.containerId}' not found.`), null;
  const l = document.createElement("header");
  l.className = "mb-4 shadow-sm";
  const c = document.createElement("div");
  c.className = "px-3 py-2 text-bg-dark border-bottom";
  const a = document.createElement("div");
  a.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-between";
  const i = e.brand || {}, n = document.createElement("a");
  n.href = i.href || "./", n.className = "d-flex align-items-center text-white text-decoration-none my-1";
  const o = document.createElement("span");
  o.className = "brand-icon me-2", o.textContent = i.iconText || "B";
  const s = document.createElement("div");
  s.className = "d-flex flex-column", s.innerHTML = `
        <span class="fs-5 fw-bold lh-1">${i.title || "Menu"}</span>
        <small class="text-secondary" style="font-size: 0.72rem;">${i.subtitle || ""}</small>
    `, n.appendChild(o), n.appendChild(s), a.appendChild(n);
  const d = y({
    inItems: e.items,
    inOnAction: e.handleItemClick.bind(e)
  });
  a.appendChild(d);
  const r = e.collapseId || "mobileNavCollapse", m = document.createElement("button");
  m.type = "button", m.className = "btn btn-outline-secondary text-white border-secondary d-md-none my-1 px-2 py-1", m.setAttribute("data-bs-toggle", "collapse"), m.setAttribute("data-bs-target", `#${r}`), m.setAttribute("aria-controls", r), m.setAttribute("aria-expanded", "false"), m.setAttribute("aria-label", "Toggle navigation"), m.innerHTML = '<i class="bi bi-list fs-3 lh-1"></i>', a.appendChild(m), c.appendChild(a);
  const b = k({
    inItems: e.items,
    inCollapseId: r,
    inOnAction: e.handleItemClick.bind(e)
  });
  if (c.appendChild(b), l.appendChild(c), e.subHeader) {
    const u = I({
      inSubHeader: e.subHeader,
      inOnAction: e.handleActionClick.bind(e)
    });
    u && l.appendChild(u);
  }
  return t.innerHTML = "", t.appendChild(l), {
    element: l,
    collapseElement: b
  };
};
class w {
  constructor({
    brand: e = {},
    items: t = [],
    subHeader: l = null,
    targetContainerId: c = "header-container",
    collapseId: a = "mobileNavCollapse",
    onItemClick: i = null,
    onActionClick: n = null,
    inBrand: o,
    inItems: s,
    inSubHeader: d,
    inTargetContainerId: r,
    inCollapseId: m,
    inOnItemClick: b,
    inOnActionClick: u
  } = {}) {
    const h = o ?? e, f = s ?? t, C = d ?? l, x = r ?? c, E = m ?? a, g = b ?? i, v = u ?? n;
    this.brand = h, this.items = Array.isArray(f) ? [...f] : [], this.subHeader = C, this.containerId = x, this.collapseId = E, this.itemClickCallback = g, this.actionClickCallback = v, this.headerElement = null, this.mobileCollapseElement = null;
  }
  render({ inContainerId: e } = {}) {
    const t = e;
    t && (this.containerId = t);
    const l = N({ inMenu: this });
    return l && (this.headerElement = l.element, this.mobileCollapseElement = l.collapseElement), l;
  }
  handleItemClick({ inItem: e, inEvent: t } = {}) {
    const l = e, c = t;
    typeof this.itemClickCallback == "function" && this.itemClickCallback({ inItem: l, inEvent: c });
  }
  handleActionClick({ inAction: e, inEvent: t } = {}) {
    const l = e, c = t;
    typeof this.actionClickCallback == "function" && this.actionClickCallback({ inAction: l, inEvent: c });
  }
  onItemClick({ inCallback: e } = {}) {
    const t = e;
    return this.itemClickCallback = t, this;
  }
  onActionClick({ inCallback: e } = {}) {
    const t = e;
    return this.actionClickCallback = t, this;
  }
  setBadge({ inText: e = "", inType: t = "secondary", inClass: l = "" } = {}) {
    var s, d;
    const c = e, a = t, i = l, n = ((d = (s = this.subHeader) == null ? void 0 : s.status) == null ? void 0 : d.id) || "record-count-badge", o = document.getElementById(n);
    o && (i ? o.className = i : a === "success" ? o.className = "badge bg-success" : a === "warning" ? o.className = "badge bg-warning text-dark" : o.className = `badge bg-${a}`, o.textContent = c);
  }
  collapseMobile() {
    var t, l;
    const e = document.getElementById(this.collapseId);
    if (e && e.classList.contains("show")) {
      const c = (l = (t = window.bootstrap) == null ? void 0 : t.Collapse) == null ? void 0 : l.getInstance(e);
      c && c.hide();
    }
  }
  expandMobile() {
    var t, l;
    const e = document.getElementById(this.collapseId);
    if (e && !e.classList.contains("show")) {
      const c = (l = (t = window.bootstrap) == null ? void 0 : t.Collapse) == null ? void 0 : l.getOrCreateInstance(e);
      c && c.show();
    }
  }
  updateItems({ inItems: e = [] } = {}) {
    const t = e;
    return this.items = Array.isArray(t) ? [...t] : [], this.render();
  }
}
const A = "v1.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-menu"] = {
  version: A,
  Menu: w
};
export {
  w as Menu,
  w as default,
  A as version
};
