import { Button, Form as AntForm } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateComodity } from "../../actions/comodityAction";
import { AntInput } from "../../customField/CreateAntField";

const FormComodityEdit = ({ comodity, setVisible }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const initialValues = comodity;

    const validationSchema = Yup.object().shape({});

    const onSubmit = (values, formAction) => {
        const unitId = comodity.unit && comodity.unit._id;
        dispatch(updateComodity({ ...values, unitId }, comodity._id));
        setVisible(false);
        formAction.setSubmitting(false);
    };

    return (
        <div className="form_product">
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
                                label="Tên hàng hóa"
                                type="text"
                                placeholder="Nhập tên hàng hóa"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="price"
                                label="Đơn giá"
                                type="text"
                                placeholder="Nhập đơn giá"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="unit.unit"
                                label="Đơn vị quy ước"
                                type="number"
                                placeholder="Nhập đơn vị tính"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="unit.unitMath"
                                label="Đơn vị tính"
                                type="text"
                                placeholder="Nhập đơn vị tính"
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

export default FormComodityEdit;
