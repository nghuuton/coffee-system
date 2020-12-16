import moment from "moment";

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

export const caculatorTotalChart = (newlabels, data) => {
    const datasets = [];
    for (const date of newlabels) {
        let total = 0;
        for (const item of data) {
            if (moment(item.createdAt).format("DD/MM/YYYY") === date) {
                total += item.detailInvoice.intoMoney;
            }
        }
        datasets.push(total);
    }
    return datasets;
};

export const caculatorTotalChartQuantity = (labelsProduct, data) => {
    const datasets = [];
    for (const label of labelsProduct) {
        let total = 0;
        for (const item of data) {
            for (const product of item) {
                if (product._id === label._id) {
                    total += product.quantity;
                }
            }
        }
        datasets.push(total);
    }
    return datasets;
};
