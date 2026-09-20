import { Menu } from "../../src/v2/index.js";

const startFunc = async () => {
    const menuItems = [
        { id: "home", label: "Home", icon: "bi-house", href: "#", active: true },
        { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2", href: "#" },
        { id: "orders", label: "Orders", icon: "bi-table", href: "#" },
        { id: "products", label: "Products", icon: "bi-grid", href: "#" },
        { id: "customers", label: "Customers", icon: "bi-person-circle", href: "#" }
    ];

    const menu = new Menu({
        brand: {
            title: "Double header",
            icon: "bi-bootstrap-fill",
            href: "#"
        },
        items: menuItems,
        subHeader: {
            search: {
                placeholder: "Search...",
                id: "nav-search"
            },
            actions: [
                { id: "login", label: "Login", class: "btn btn-sm btn-light text-dark me-2" },
                { id: "signup", label: "Sign-up", class: "btn btn-sm btn-primary" }
            ]
        },
        onItemClick: ({ inItem, inEvent }) => {
            console.log("Item clicked:", inItem);
        },
        onActionClick: ({ inAction, inEvent }) => {
            console.log("Action clicked:", inAction);
        }
    });

    menu.render({ inContainerId: "menu" });
};

startFunc();
