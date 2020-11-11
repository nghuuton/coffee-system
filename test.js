// * Class Bill
class Bill {
    constructor(products) {
        this.products = products;
    }
    static CaculateTotal(products) {
        let total = 0;
        for (let item of products) {
            total += item.quantity * item.price;
        }
        return total;
    }
    decrementAmountStore(Store, products) {
        for (let item of products) {
            const splitName = item.name.split(" ");
            const findName = splitName.includes(`${Store.name}`);
            const milkName = splitName.includes("Milk");
            if (findName && Store.unit === "Kg") {
                milkName
                    ? milkStore.decrement(milkStore, item.quantity, 20)
                    : sugarStore.decrement(sugarStore, item.quantity * 2, 1);
                Store.decrement(Store, item.quantity, 20);
                // amount += item.quantity / 20;
            } else {
                pepsiStore.decrement(pepsiStore, item.quantity, 24);
            }
        }
        // Store.amount -= amount;

        // console.log(amount);
    }
}

// * Class Store
class Store {
    constructor(name, unit, quantity) {
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
    }
    decrement(Store, quantity, unitNumber) {
        Store.quantity -= quantity / unitNumber;
    }
}

// * Init Store && Bill
const coffeeStore = new Store("Coffee", "Kg", 1);
const milkStore = new Store("Milk", "Box", 1);
const sugarStore = new Store("Sugar", "Pack", 50);
const pepsiStore = new Store("Pepsi", "Box", 1);

const newBill = new Bill([
    { _id: 1, name: "Black Coffee", quantity: 10, price: "13000" },
    { _id: 2, name: "Milk Coffee", quantity: 10, price: "15000" },
    { _id: 3, name: "Pepsi Water", quantity: 4, price: "14000" },
]);

var total = Bill.CaculateTotal(newBill.products);

// * Run Function
console.table(newBill);
console.log(`Total Pay: ${total}`);

newBill.decrementAmountStore(coffeeStore, newBill.products);

console.log(coffeeStore);
console.log(milkStore);
console.log(sugarStore);
console.log(pepsiStore);
