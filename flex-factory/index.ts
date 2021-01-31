/**
 * @description
 * Simple Factory is not a pattern itself, it is more likely an programming idiom, that allow us to
 * write boilerplate code in single place.
 */
abstract class FlexPizza {
    #toppings: Set<string> = new Set();

    constructor(
        private _name: string,
        private _dough: string,
        private _sauce: string,
    ) {
    }

    get name() {
        return this._name;
    }

    protected addTopping(v: string) {
        this.#toppings.add(v);
    }

    prepare(): void {
        console.info('Preparing ' + this._name);
        console.info('Tossing _dough...');
        console.info('Adding toppngs: ');
        this.#toppings.forEach(i => console.info(' ' + i));
    }

    box(): void {
        console.info('Boxing Pizza');
    }

    bake(): void {
        console.info('Baking Pizza for 25 minutes');
    }

    cut(): void {
        console.info('Cutting Pizza into diagonal slices');
    }
}

class CAPepperoni extends FlexPizza {
    constructor() {
        super(
            'California Style Sauce and Pepperoni Pizza',
            'Thin Crust Dough',
            'Tomato Sauce',
        );

        this.addTopping('Grated Reggiano Cheese');
    }
}

class CACheese extends FlexPizza {
    constructor() {
        super(
            'California Style Sauce and Cheeze Pizza',
            'Thin Crust Dough',
            'Marinara Sauce',
        );

        this.addTopping('Grated Reggiano Cheese');
    }
}


class CAVeggie extends FlexPizza {
    constructor() {
        super(
            'California Style Sauce and Vegetables Pizza',
            'Thin Crust Dough',
            'Tomato Sauce',
        );

        this.addTopping('Grated Reggiano Cheese');
    }
}

class NYPepperoni extends FlexPizza {
    constructor() {
        super(
            'NY Style Sauce and Pepperoni Pizza',
            'Extra Thick Crust Dough',
            'Tomato Sauce',
        );

        this.addTopping('Grated Reggiano Cheese');
    }
}

class NYCheese extends FlexPizza {
    constructor() {
        super(
            'NY Style Sauce and Cheeze Pizza',
            'Extra Thick Crust Dough',
            'Marinara Sauce',
        );

        this.addTopping('Grated Reggiano Cheese');
    }
}

class NYVeggie extends FlexPizza {

    constructor() {
        super(
            'NY Style Sauce and Vegetables Pizza',
            'Extra Thick Crust Dough',
            'Tomato Sauce',
        );

        this.addTopping('Grated Reggiano Cheese');
    }
}

abstract class FlexPizzaStore {
    orderPizza(type: string): FlexPizza {
        const pizzaInstance = this.createPizza(type);

        pizzaInstance.prepare();
        pizzaInstance.bake();
        pizzaInstance.cut();
        pizzaInstance.box();

        return pizzaInstance;
    }

    protected abstract createPizza(type: string): FlexPizza;
}


class NYPizzaStore extends FlexPizzaStore {
    protected createPizza(type: string): FlexPizza {
        let PizzaClass;
        const pizzaRecord: Record<string, {new(): FlexPizza}> = {
            pepperoni: NYPepperoni,
            cheese: NYCheese,
            veggie: NYVeggie,
        };

        PizzaClass = pizzaRecord[type];
        return new PizzaClass();
    }
}

class CAPizzaStore extends FlexPizzaStore {
    protected createPizza(type: string): FlexPizza {
        let PizzaClass;
        const pizzaRecord: Record<string, {new(): FlexPizza}> = {
            pepperoni: CAPepperoni,
            cheese: CACheese,
            veggie: CAVeggie,
        };

        PizzaClass = pizzaRecord[type];
        return new PizzaClass();
    }
}

const nyStore = new NYPizzaStore();
const caStore = new CAPizzaStore();

(function () {
    nyStore.orderPizza('cheese');
    caStore.orderPizza('veggie');
})();
