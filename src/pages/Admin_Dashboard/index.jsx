import moment from "moment";
import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import InvoiceApi from "../../api/InvoiceApi";
import ProductApi from "../../api/ProductApi";
import {
    caculatorTotalChart,
    caculatorTotalChartQuantity,
} from "../../utils/formatNumber";

import { Button, DatePicker } from "antd";
import Form from "antd/lib/form/Form";

const { RangePicker } = DatePicker;

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            datasets: [],
            labelsProduct: [],
            datasetsProducts: [],
            start: "",
            end: "",
        };
    }

    async componentDidMount() {
        const data = await InvoiceApi.getChart();
        const labels = data.map((item) => moment(item.createdAt).format("DD/MM/YYYY"));
        const newlabels = [...new Set(labels)];
        const datasets = caculatorTotalChart(newlabels, data);

        const result = await ProductApi.getListProduct();
        const labelsProduct = result.map((item) => item.name);

        const arrayProductInvoie = data.map((item) => item.detailInvoice.product);

        const datasetsProducts = caculatorTotalChartQuantity(result, arrayProductInvoie);
        this.setState({ labels: newlabels, datasets, labelsProduct, datasetsProducts });
    }

    handleChange = (values) => {
        const start = values ? values[0]._d : "";
        const end = values ? values[1]._d : "";

        this.setState({
            start,
            end,
        });
    };

    handleClick = async (start, end) => {
        const data = await InvoiceApi.getChart({ start, end });
        const labels = data.map((item) => moment(item.createdAt).format("DD/MM/YYYY"));
        const newlabels = [...new Set(labels)];
        const datasets = caculatorTotalChart(newlabels, data);
        this.setState({ labels: newlabels, datasets });
    };

    render() {
        const {
            labels,
            datasets,
            labelsProduct,
            datasetsProducts,
            start,
            end,
        } = this.state;
        return (
            <div className="chart_admin">
                <div className="header_chart">
                    <Doughnut
                        height={35}
                        data={{
                            labels: labelsProduct,
                            datasets: [
                                {
                                    label: "Tổng số món đã bán được",
                                    backgroundColor: [
                                        "#545863",
                                        "#3B252C",
                                        "#3cba9f",
                                        "#e8c3b9",
                                        "#c45850",
                                        "#523A34",
                                        "#6B9AC4",
                                    ],
                                    data: datasetsProducts,
                                },
                            ],
                        }}
                        option={{
                            title: {
                                display: true,
                                text: "Tổng số sản phẩm bán được",
                            },
                        }}
                    />
                </div>
                <Form className="chart_form">
                    <RangePicker name="date" onChange={this.handleChange} />
                    <Button onClick={() => this.handleClick(start, end)}>Thống kê</Button>
                </Form>
                <Bar
                    width={80}
                    height={30}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Tổng thu nhập ngày đó",
                                backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850",
                                    "#523A34",
                                    "#6B9AC4",
                                ],
                                data: datasets,
                            },
                        ],
                    }}
                    options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Biểu đồ tổng thu nhập",
                        },
                    }}
                />
            </div>
        );
    }
}

export default AdminDashboard;
