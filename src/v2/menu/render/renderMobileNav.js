const renderMobileNav = ({
    inItems = [],
    inCollapseId = "mobileNavCollapse",
    inMobileFlavor = "list",
    inOnAction
} = {}) => {
    const localItems = inItems;
    const localCollapseId = inCollapseId;
    const localMobileFlavor = inMobileFlavor;
    const localOnAction = inOnAction;

    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse d-md-none w-100";
    collapseDiv.id = localCollapseId;

    const innerContainer = document.createElement("div");
    innerContainer.className = "container-fluid px-2 pt-3 pb-2 border-top border-secondary mt-2";

    if (localMobileFlavor === "grid" || localMobileFlavor === "tiles") {
        // Grid flavor (tiles box)
        const row = document.createElement("div");
        row.className = "row row-cols-3 g-2 text-center text-small";

        localItems.forEach(item => {
            const col = document.createElement("div");
            col.className = "col";

            const a = document.createElement("a");
            a.href = item.href || "#";

            const borderClass = item.active ? "border-primary" : (item.id === "reset" ? "border-info" : "border-secondary");
            a.className = `nav-link py-2 rounded bg-dark border ${borderClass} text-white`;

            if (item.id) {
                a.id = `menu-mobile-${item.id}`;
                a.setAttribute("data-item-id", item.id);
            }

            let innerContent = "";
            if (item.icon) {
                const iconClass = item.active ? "text-primary" : (item.id === "reset" ? "text-info" : "text-white");
                innerContent += `<i class="bi ${item.icon} d-block mx-auto mb-1 fs-4 ${iconClass}"></i>`;
            }

            const textClass = item.active ? "text-primary fw-semibold" : (item.id === "reset" ? "text-info" : "text-white");
            innerContent += `<span class="${textClass}">${item.label || ""}</span>`;
            a.innerHTML = innerContent;

            if (item.isAction || typeof localOnAction === "function") {
                a.addEventListener("click", event => {
                    if (typeof localOnAction === "function") {
                        localOnAction({ inItem: item, inEvent: event });
                    }
                });
            }

            col.appendChild(a);
            row.appendChild(col);
        });

        innerContainer.appendChild(row);
    } else {
        // Collapsible List flavor (left icon, right label)
        const listGroup = document.createElement("div");
        listGroup.className = "list-group list-group-flush bg-transparent";

        localItems.forEach(item => {
            const a = document.createElement("a");
            a.href = item.href || "#";

            const activeClass = item.active
                ? "bg-primary text-white fw-bold shadow-sm"
                : (item.id === "reset" ? "bg-dark text-info border-secondary" : "bg-dark text-white-50 border-secondary");

            a.className = `list-group-item list-group-item-action d-flex align-items-center py-2 px-3 mb-1 rounded border ${activeClass}`;

            if (item.id) {
                a.id = `menu-mobile-${item.id}`;
                a.setAttribute("data-item-id", item.id);
            }

            let iconHtml = "";
            if (item.icon) {
                const iconColor = item.active ? "text-white" : (item.id === "reset" ? "text-info" : "text-light");
                iconHtml = `<i class="bi ${item.icon} fs-5 me-3 ${iconColor}" style="width: 24px; text-align: center;"></i>`;
            }

            const labelColor = item.active ? "text-white" : (item.id === "reset" ? "text-info" : "text-light");
            const labelHtml = `<span class="${labelColor} flex-grow-1">${item.label || ""}</span>`;
            const chevronHtml = `<i class="bi bi-chevron-right text-secondary small"></i>`;

            a.innerHTML = `${iconHtml}${labelHtml}${chevronHtml}`;

            if (item.isAction || typeof localOnAction === "function") {
                a.addEventListener("click", event => {
                    if (typeof localOnAction === "function") {
                        localOnAction({ inItem: item, inEvent: event });
                    }
                });
            }

            listGroup.appendChild(a);
        });

        innerContainer.appendChild(listGroup);
    }

    collapseDiv.appendChild(innerContainer);

    return collapseDiv;
};

export { renderMobileNav };
export default renderMobileNav;
