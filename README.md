# json-to-dom-menu

A standalone, config-driven responsive **Menu & Header renderer** built on top of the `json-to-dom` architecture.

## Features

- **Data-Driven Navigation**: Render complete navigation from a simple array of JSON objects.
- **Auto-Responsive**:
  - **Desktop (`≥ 768px`)**: Renders full horizontal icon navigation directly across the top bar.
  - **Mobile (`< 768px`)**: Automatically renders a hamburger button on the right with an expandable drawer.
- **Optional SubHeader Toolbar**: Supports real-time status badges and custom action buttons.
- **Strict Architecture**: Adheres to the `{ in... }` to `local...` naming convention.

## Installation / Usage

```javascript
import { Menu } from "json-to-dom-menu";

const menuItems = [
    { id: "home", label: "Home", icon: "bi-house", href: "#/" },
    { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2", href: "#/dashboard" },
    { id: "orders", label: "Orders", icon: "bi-table", active: true },
    { id: "products", label: "Products", icon: "bi-grid", href: "#/products" },
    { id: "customers", label: "Customers", icon: "bi-people", href: "#/customers" },
    { id: "reset", label: "Reset", icon: "bi-arrow-clockwise", class: "text-info", isAction: true }
];

const menu = new Menu({
    targetContainerId: "header-container",
    brand: {
        title: "Purchases",
        subtitle: "Hybrid Search & Table",
        iconText: "B",
        href: "./"
    },
    items: menuItems,
    subHeader: {
        status: {
            id: "record-count-badge",
            label: "Status:",
            badgeText: "All 7,455 records",
            badgeClass: "badge bg-success"
        },
        actions: [
            { id: "reset-filters", label: "Reset Filters", icon: "bi-arrow-clockwise", class: "btn btn-sm btn-primary" },
            { id: "reload-server", label: "Reload Server", icon: "bi-cloud-arrow-down", class: "btn btn-sm btn-outline-secondary" }
        ]
    },
    onItemClick: ({ inItem, inEvent }) => {
        if (inItem.id === "reset") {
            inEvent.preventDefault();
            // Handle reset
            menu.collapseMobile();
        }
    },
    onActionClick: ({ inAction, inEvent }) => {
        if (inAction.id === "reset-filters") {
            // Handle reset
        }
    }
});

menu.render();
```

## License
MIT
