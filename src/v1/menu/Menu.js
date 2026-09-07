import { renderMenu } from "./render/renderMenu.js";

class Menu {
    constructor({
        brand = {},
        items = [],
        subHeader = null,
        targetContainerId = "header-container",
        collapseId = "mobileNavCollapse",
        onItemClick = null,
        onActionClick = null,
        inBrand,
        inItems,
        inSubHeader,
        inTargetContainerId,
        inCollapseId,
        inOnItemClick,
        inOnActionClick
    } = {}) {
        const localBrand = inBrand ?? brand;
        const localItems = inItems ?? items;
        const localSubHeader = inSubHeader ?? subHeader;
        const localTargetContainerId = inTargetContainerId ?? targetContainerId;
        const localCollapseId = inCollapseId ?? collapseId;
        const localOnItemClick = inOnItemClick ?? onItemClick;
        const localOnActionClick = inOnActionClick ?? onActionClick;

        this.brand = localBrand;
        this.items = Array.isArray(localItems) ? [...localItems] : [];
        this.subHeader = localSubHeader;
        this.containerId = localTargetContainerId;
        this.collapseId = localCollapseId;
        this.itemClickCallback = localOnItemClick;
        this.actionClickCallback = localOnActionClick;

        this.headerElement = null;
        this.mobileCollapseElement = null;
    }

    render({ inContainerId } = {}) {
        const localContainerId = inContainerId;
        if (localContainerId) {
            this.containerId = localContainerId;
        }

        const result = renderMenu({ inMenu: this });
        if (result) {
            this.headerElement = result.element;
            this.mobileCollapseElement = result.collapseElement;
        }
        return result;
    }

    handleItemClick({ inItem, inEvent } = {}) {
        const localItem = inItem;
        const localEvent = inEvent;

        if (typeof this.itemClickCallback === "function") {
            this.itemClickCallback({ inItem: localItem, inEvent: localEvent });
        }
    }

    handleActionClick({ inAction, inEvent } = {}) {
        const localAction = inAction;
        const localEvent = inEvent;

        if (typeof this.actionClickCallback === "function") {
            this.actionClickCallback({ inAction: localAction, inEvent: localEvent });
        }
    }

    onItemClick({ inCallback } = {}) {
        const localCallback = inCallback;
        this.itemClickCallback = localCallback;
        return this;
    }

    onActionClick({ inCallback } = {}) {
        const localCallback = inCallback;
        this.actionClickCallback = localCallback;
        return this;
    }

    setBadge({ inText = "", inType = "secondary", inClass = "" } = {}) {
        const localText = inText;
        const localType = inType;
        const localClass = inClass;

        const badgeId = this.subHeader?.status?.id || "record-count-badge";
        const badgeElement = document.getElementById(badgeId);
        if (!badgeElement) return;

        if (localClass) {
            badgeElement.className = localClass;
        } else if (localType === "success") {
            badgeElement.className = "badge bg-success";
        } else if (localType === "warning") {
            badgeElement.className = "badge bg-warning text-dark";
        } else {
            badgeElement.className = `badge bg-${localType}`;
        }

        badgeElement.textContent = localText;
    }

    collapseMobile() {
        const collapseElement = document.getElementById(this.collapseId);
        if (collapseElement && collapseElement.classList.contains("show")) {
            const bsCollapse = window.bootstrap?.Collapse?.getInstance(collapseElement);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    }

    expandMobile() {
        const collapseElement = document.getElementById(this.collapseId);
        if (collapseElement && !collapseElement.classList.contains("show")) {
            const bsCollapse = window.bootstrap?.Collapse?.getOrCreateInstance(collapseElement);
            if (bsCollapse) {
                bsCollapse.show();
            }
        }
    }

    updateItems({ inItems = [] } = {}) {
        const localItems = inItems;
        this.items = Array.isArray(localItems) ? [...localItems] : [];
        return this.render();
    }
}

export { Menu };
export default Menu;
