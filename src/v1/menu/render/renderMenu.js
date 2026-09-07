import { renderDesktopNav } from "./renderDesktopNav.js";
import { renderMobileNav } from "./renderMobileNav.js";
import { renderSubHeader } from "./renderSubHeader.js";

const renderMenu = ({ inMenu } = {}) => {
    const localMenu = inMenu;

    const targetContainer = typeof localMenu?.containerId === "string"
        ? document.getElementById(localMenu.containerId)
        : localMenu?.containerId;

    if (!targetContainer) {
        console.warn(`[json-to-dom-menu] Container '#${localMenu?.containerId}' not found.`);
        return null;
    }

    const header = document.createElement("header");
    header.className = "mb-4 shadow-sm";

    // 1. Top Dark Bar
    const topBar = document.createElement("div");
    topBar.className = "px-3 py-2 text-bg-dark border-bottom";

    const topBarContainer = document.createElement("div");
    topBarContainer.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-between";

    // Brand
    const brand = localMenu.brand || {};
    const brandAnchor = document.createElement("a");
    brandAnchor.href = brand.href || "./";
    brandAnchor.className = "d-flex align-items-center text-white text-decoration-none my-1";

    const brandIcon = document.createElement("span");
    brandIcon.className = "brand-icon me-2";
    brandIcon.textContent = brand.iconText || "B";

    const brandTextDiv = document.createElement("div");
    brandTextDiv.className = "d-flex flex-column";
    brandTextDiv.innerHTML = `
        <span class="fs-5 fw-bold lh-1">${brand.title || "Menu"}</span>
        <small class="text-secondary" style="font-size: 0.72rem;">${brand.subtitle || ""}</small>
    `;

    brandAnchor.appendChild(brandIcon);
    brandAnchor.appendChild(brandTextDiv);
    topBarContainer.appendChild(brandAnchor);

    // Desktop Nav
    const desktopNav = renderDesktopNav({
        inItems: localMenu.items,
        inOnAction: localMenu.handleItemClick.bind(localMenu)
    });
    topBarContainer.appendChild(desktopNav);

    // Mobile Hamburger Button
    const collapseId = localMenu.collapseId || "mobileNavCollapse";
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.type = "button";
    hamburgerBtn.className = "btn btn-outline-secondary text-white border-secondary d-md-none my-1 px-2 py-1";
    hamburgerBtn.setAttribute("data-bs-toggle", "collapse");
    hamburgerBtn.setAttribute("data-bs-target", `#${collapseId}`);
    hamburgerBtn.setAttribute("aria-controls", collapseId);
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Toggle navigation");
    hamburgerBtn.innerHTML = `<i class="bi bi-list fs-3 lh-1"></i>`;
    topBarContainer.appendChild(hamburgerBtn);

    topBar.appendChild(topBarContainer);

    // Mobile Collapsible Menu
    const mobileNav = renderMobileNav({
        inItems: localMenu.items,
        inCollapseId: collapseId,
        inOnAction: localMenu.handleItemClick.bind(localMenu)
    });
    topBar.appendChild(mobileNav);

    header.appendChild(topBar);

    // SubHeader Toolbar (Optional)
    if (localMenu.subHeader) {
        const subHeader = renderSubHeader({
            inSubHeader: localMenu.subHeader,
            inOnAction: localMenu.handleActionClick.bind(localMenu)
        });
        if (subHeader) {
            header.appendChild(subHeader);
        }
    }

    targetContainer.innerHTML = "";
    targetContainer.appendChild(header);

    return {
        element: header,
        collapseElement: mobileNav
    };
};

export { renderMenu };
export default renderMenu;
