export class Engine {
    /**
     *
     * @param {string}name
     * @param {string}logo
     */
    constructor(name, logo) {
        const engine$this = this;
        engine$this.name = name;
        engine$this.logo = logo;
    }

}

export const engine$bs3 = new Engine("<span style='color: blue;font-weight: bold'>Bootstrap 3</span>", "bs3.png")
export const engine$bs5 = new Engine("<span style='color: gold;font-weight: bold'>Bootstrap 5</span>", "bs5.png")