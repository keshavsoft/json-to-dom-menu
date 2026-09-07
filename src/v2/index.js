import { Menu } from "./menu/index.js";

const version = "v2.0.0";

window.ks ??= {};
window.ks["json-to-dom-menu"] = {
    version,
    Menu
};

export { version, Menu };
export default Menu;
