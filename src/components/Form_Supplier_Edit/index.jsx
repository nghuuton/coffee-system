import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateSupplier } from "../../actions/supplierAction";
import { AntInput } from "../../customField/CreateAntField";

const FormSupplierEdit = ({ supplier, setVisible }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const initialValues = supplier;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required."),
        address: Yup.string().required("Address is required."),
        phone: Yup.string()
            .required("Phone is required.")
            .min(9, "Min 9 number length.")
            .max(9, "Not over 9 number length."),
    });

    const onSubmit = (values, formAction) => {
        dispatch(updateSupplier(supplier._id, values));
        message.success({
            content: `Cập nhật thành công`,
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
        setVisible(false);
        formAction.resetForm();
        formAction.setSubmitting(false);
    };

    return (
        <div className="form_invoice">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {(formikProps) => {
                    const { handleSubmit, isValid, isSubmitting } = formikProps;
                    return (
                        <AntForm form={form} encType="multipart/form-data">
                            <FastField
                                name="name"
                                label="Nhà cung cấp"
                                type="text"
                                placeholder="Nhập tên nhà cung cấp"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="address"
                                label="Địa chỉ"
                                type="text"
                                placeholder="Nhập địa chỉ"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="phone"
                                label="SĐT (+84)"
                                type="text"
                                placeholder="Nhập tên nhà cung cấp"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="primary"
                            >
                                Cập nhật
                            </Button>
                        </AntForm>
                    );
                }}
            </Formik>
        </div>
    );
};

export default FormSupplierEdit;
