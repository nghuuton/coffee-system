export const generatorListInvoice = (invoice, detailInvoice) => {
    let newPanes = [];
    if (invoice.length !== 0) {
        newPanes = invoice.map((item, index) => {
            return {
                title: item.ownerTable.name,
                content:
                    item.detailInvoice._id === detailInvoice[index]._id
                        ? detailInvoice[index].product.map((item) => {
                              return {
                                  quantity: item.quantity,
                                  ...item._id,
                                  note: "",
                                  status: item.status,
                              };
                          })
                        : [],
                table: item.ownerTable,
                totalPayment: detailInvoice[index].totalPayment,
                intoMoney: detailInvoice[index].intoMoney,
                percent: item.percent,
            };
        });
    }
    return newPanes;
};
