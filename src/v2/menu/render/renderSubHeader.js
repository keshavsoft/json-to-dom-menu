const renderSubHeader = ({ inSubHeader = {}, inOnAction } = {}) => {
    const localSubHeader = inSubHeader;
    const localOnAction = inOnAction;

    if (!localSubHeader || (!localSubHeader.status && !localSubHeader.actions && !localSubHeader.search)) {
        return null;
    }

    const toolbarDiv = document.createElement("div");
    toolbarDiv.className = "px-3 py-2 border-bottom bg-white";

    const container = document.createElement("div");
    container.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-between gap-2";

    // 1. Search Section (Optional, matching Bootstrap Double Header search bar)
    if (localSubHeader.search) {
        const searchForm = document.createElement("form");
        searchForm.className = localSubHeader.search.formClass || "col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto";
        searchForm.role = "search";

        const searchInput = document.createElement("input");
        searchInput.type = "search";
        searchInput.className = localSubHeader.search.inputClass || "form-control form-control-sm";
        searchInput.placeholder = localSubHeader.search.placeholder || "Search...";
        searchInput.setAttribute("aria-label", localSubHeader.search.placeholder || "Search");
        if (localSubHeader.search.id) {
            searchInput.id = localSubHeader.search.id;
        }

        searchForm.appendChild(searchInput);
        container.appendChild(searchForm);
    }

    // 1. Status Section
    if (localSubHeader.status) {
        const statusDiv = document.createElement("div");
        statusDiv.className = "d-flex align-items-center";

        if (localSubHeader.status.label) {
            const labelSpan = document.createElement("span");
            labelSpan.className = "text-secondary small me-2";
            labelSpan.textContent = localSubHeader.status.label;
            statusDiv.appendChild(labelSpan);
        }

        const badgeSpan = document.createElement("span");
        badgeSpan.id = localSubHeader.status.id || "record-count-badge";
        badgeSpan.className = localSubHeader.status.badgeClass || "badge bg-secondary";
        badgeSpan.textContent = localSubHeader.status.badgeText || "Ready";
        statusDiv.appendChild(badgeSpan);

        container.appendChild(statusDiv);
    }

    // 2. Action Buttons Section
    if (Array.isArray(localSubHeader.actions) && localSubHeader.actions.length > 0) {
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "d-flex gap-2";

        localSubHeader.actions.forEach(action => {
            const button = document.createElement("button");
            button.type = "button";
            button.id = action.id || "";
            button.className = action.class || "btn btn-sm btn-primary";

            if (action.title) {
                button.title = action.title;
            }

            let btnHtml = "";
            if (action.icon) {
                btnHtml += `<i class="bi ${action.icon} me-1"></i> `;
            }
            btnHtml += (action.label || "");
            button.innerHTML = btnHtml;

            button.addEventListener("click", event => {
                if (typeof localOnAction === "function") {
                    localOnAction({ inAction: action, inEvent: event });
                }
            });

            actionsDiv.appendChild(button);
        });

        container.appendChild(actionsDiv);
    }

    toolbarDiv.appendChild(container);
    return toolbarDiv;
};

export { renderSubHeader };
export default renderSubHeader;
