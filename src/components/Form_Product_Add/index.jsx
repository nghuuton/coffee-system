import { Button, Form as AntForm } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addNewProduct } from "../../actions/productAction";
import { AntInput, AntSelect, UploadFile } from "../../customField/CreateAntField";

const FormProductAdd = ({ listType, listComodity, setVisible, typeModel }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        image: null,
        price: "",
        comoditys: [],
        type: listType[0]._id,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required."),
        price: Yup.number().required("Price is required."),
        comoditys: Yup.array("").required("Comoditys is required."),
    });

    const onSubmit = (values, formAction) => {
        dispatch(addNewProduct(values));
        setVisible(false);
        formAction.resetForm();
        formAction.setSubmitting(false);
    };

    return (
        <div className="form_product">
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
                                name="name"
                                label="Tên món"
                                type="text"
                                placeholder="Nhập tên món"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="image"
                                label="Hình ảnh"
                                listType="picture"
                                hasFeedback={true}
                                component={UploadFile}
                            />
                            <FastField
                                name="price"
                                label="Giá"
                                type="number"
                                placeholder="Nhập giá"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="type"
                                label="Loại"
                                placeholder="Chọn loại"
                                hasFeedback={true}
                                selectOptions={listType}
                                component={AntSelect}
                            />
                            <FastField
                                name="comoditys"
                                mode="multiple"
                                label="Thành phần"
                                placeholder="Chọn hàng hoá"
                                hasFeedback={true}
                                selectOptions={listComodity}
                                component={AntSelect}
                            />
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

export default FormProductAdd;
