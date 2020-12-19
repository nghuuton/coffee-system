import { CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Form as AntForm, message } from "antd";
import { FastField, FieldArray, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createNewInvoiceIssues } from "../../actions/invoiceIssuesAction";
import InvoiceIssuesApi from "../../api/InvoiceIssuesApi";
import { AntInput } from "../../customField/CreateAntField";

const FormInvoiceAdd = ({ typeModel, byStaff, setVisible }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();

    const initialValues = {
        byStaff: byStaff,
        bySupplier: "",
        comoditys: [""],
        price: [""],
        quantity: [""],
    };

    const validationSchema = Yup.object().shape({
        bySupplier: Yup.string().required("Supplier is required."),
        comoditys: Yup.array()
            .required("Comoditys is required.")
            .min(1, "Comoditys is required."),
    });

    const onSubmit = (values, formAction) => {
        dispatch(createNewInvoiceIssues(values));
        setVisible(false);
        message.success({
            content: `Tạo hoá đơn nhập thành công`,
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
        formAction.resetForm();
        formAction.setSubmitting(false);
    };

    return (
        <div className="form_invoice">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formikProps) => {
                    const { handleSubmit, isValid, isSubmitting } = formikProps;
                    return (
                        <AntForm form={form}>
                            <FastField
                                name="bySupplier"
                                label="Nhà cung cấp"
                                type="text"
                                placeholder="Nhập tên nhà cung cấp"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FieldArray name="comoditys">
                                {(fieldArrayProps) => {
                                    const { push, remove, form } = fieldArrayProps;
                                    const { values } = form;
                                    const { comoditys } = values;
                                    return comoditys.map((item, index) => (
                                        <div key={index} className="input_comodity">
                                            <FastField
                                                name={`comoditys[${index}]`}
                                                label="Hàng hoá"
                                                type="text"
                                                placeholder="Hàng hoá"
                                                hasFeedback={true}
                                                component={AntInput}
                                            />
                                            <FastField
                                                name={`price[${index}]`}
                                                type="number"
                                                placeholder="Đơn giá"
                                                hasFeedback={true}
                                                className="input_comodity__price"
                                                component={AntInput}
                                            />
                                            <FastField
                                                name={`quantity[${index}]`}
                                                type="number"
                                                placeholder="Số lượng"
                                                hasFeedback={true}
                                                component={AntInput}
                                                className="input_comodity__quantity"
                                            />
                                            {index > 0 && (
                                                <Button
                                                    className="input_comodity__btn_remove"
                                                    type="primary"
                                                    danger
                                                    onClick={() => remove(index)}
                                                    icon={<CloseOutlined />}
                                                />
                                            )}
                                            <Button
                                                type="primary"
                                                className="input_comodity__btn_add"
                                                onClick={() => push("")}
                                                icon={<PlusSquareOutlined />}
                                            />
                                        </div>
                                    ));
                                }}
                            </FieldArray>
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="primary"
                            >
                                {typeModel}
                            </Button>
                        </AntForm>
                    );
                }}
            </Formik>
        </div>
    );
};

export default FormInvoiceAdd;
