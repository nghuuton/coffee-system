export const formatMoney = (total) => {
    return `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatToK = (total) => {
    return `${total.toString().replace(/,[0-9]{3}/g, "K")}`;
};
