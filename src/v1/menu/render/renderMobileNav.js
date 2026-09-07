const renderMobileNav = ({ inItems = [], inCollapseId = "mobileNavCollapse", inOnAction } = {}) => {
    const localItems = inItems;
    const localCollapseId = inCollapseId;
    const localOnAction = inOnAction;

    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse d-md-none";
    collapseDiv.id = localCollapseId;

    const innerContainer = document.createElement("div");
    innerContainer.className = "container-fluid px-2 pt-3 pb-2 border-top border-secondary mt-2";

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
    collapseDiv.appendChild(innerContainer);

    return collapseDiv;
};

export { renderMobileNav };
export default renderMobileNav;
