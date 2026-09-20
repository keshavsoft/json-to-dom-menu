import { Menu } from "../../src/v2/index.js";

const startFunc = async () => {
    // 6. Instantiate and render Form
    const menu = new Menu({});

    menu.render({ inContainerId: "menu" });
};

startFunc();
