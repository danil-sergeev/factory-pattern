/**
 * @description
 * Simple Factory is not a pattern itself, it is more likely an programming idiom, that allow us to
 * write boilerplate code in single place.
 */
abstract class Pizza {
    abstract prepare(): void;

    box(): void {
        console.info('Boxing Pizza');
    }

    bake(): void {
        console.info('Baking Pizza');
    }

    cut(): void {
        console.info('Cutting Pizza');
    }
}

class Pepperoni extends Pizza {
    prepare(): void {
        console.info('Adding Salami, Cheese... Mmm');
    }
}

class Cheese extends Pizza {
    prepare(): void {
        console.info('Adding 4 cheezes...');
    }
}

class Veggie extends Pizza {
    prepare(): void {
        console.info('Adding vegetables and tomato pasta...');
    }
}

class SimplePizzaFactory {
    static createPizza(type: string): Pizza {
        let PizzaClass;
        const pizzaRecord: Record<string, {new(): Pizza}> = {
            pepperoni: Pepperoni,
            cheese: Cheese,
            veggie: Veggie,
        };

        PizzaClass = pizzaRecord[type];
        return new PizzaClass();
    }
}

class PizzaCafe {
    constructor(
        private factory: typeof SimplePizzaFactory,
    ) {
    }

    orderPizza(type: string): Pizza {
        const pizzaInstance = this.factory.createPizza(type);

        pizzaInstance.prepare();
        pizzaInstance.bake();
        pizzaInstance.cut();
        pizzaInstance.box();

        return pizzaInstance;
    }
}

const cafe = new PizzaCafe(SimplePizzaFactory);

(function () {
    cafe.orderPizza('pepperoni');
    cafe.orderPizza('veggie');
    cafe.orderPizza('cheese');
})();
