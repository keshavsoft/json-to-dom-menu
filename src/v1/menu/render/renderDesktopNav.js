const renderDesktopNav = ({ inItems = [], inOnAction } = {}) => {
    const localItems = inItems;
    const localOnAction = inOnAction;

    const ul = document.createElement("ul");
    ul.className = "nav d-none d-md-flex align-items-center my-1 text-small text-center";

    localItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.href || "#";

        const activeClass = item.active ? "active text-primary" : (item.class || "text-white");
        a.className = `nav-link px-3 ${activeClass}`;

        if (item.id) {
            a.id = `menu-desktop-${item.id}`;
            a.setAttribute("data-item-id", item.id);
        }

        if (item.title) {
            a.title = item.title;
        }

        let innerContent = "";
        if (item.icon) {
            const iconColor = item.active ? "text-primary" : "";
            innerContent += `<i class="bi ${item.icon} d-block mx-auto mb-1 fs-5 ${iconColor}"></i>`;
        }
        innerContent += `<span>${item.label || ""}</span>`;
        a.innerHTML = innerContent;

        if (item.isAction || typeof localOnAction === "function") {
            a.addEventListener("click", event => {
                if (typeof localOnAction === "function") {
                    localOnAction({ inItem: item, inEvent: event });
                }
            });
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    return ul;
};

export { renderDesktopNav };
export default renderDesktopNav;
