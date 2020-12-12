export const formatMoney = (total) => {
    return `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatToK = (total) => {
    return `${total.toString().replace(/,[0-9]{3}/g, "K")}`;
};

export const caculatorTotal = (product) => {
    return product.quantity * product.price;
};

export const total = (arrayProduct) => {
    if (arrayProduct.length > 0) {
        return arrayProduct
            .map((item) => item.quantity * item.price)
            .reduce((a, b) => a + b);
    }
    return 0;
};
