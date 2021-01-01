import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addNewProduct } from "../../actions/productAction";
import { AntInput, AntSelect, UploadFile } from "../../customField/CreateAntField";

const FormProductAdd = ({
    listType,
    listComodity,
    setVisible,
    typeModel,
    listProduct,
}) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    const NULL_FILE = null;
    const initialValues = {
        name: "",
        image: null,
        price: "",
        comoditys: [],
        type: listType[0]._id,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên món không được bỏ trống"),
        price: Yup.number()
            .required("Giá không được bỏ trống")
            .min(1000, "Nhỏ nhất là 1000"),
        comoditys: Yup.array("")
            .required("Hàng hóa không được bỏ trống")
            .min(1, "Tối thiểu ít nhất 1 hàng hóa"),
        image: Yup.mixed().test("fileFormat", "Không đúng định dạng file", (value) =>
            value === null ? NULL_FILE === null : SUPPORTED_FORMATS.includes(value.type)
        ),
    });

    // TODO Thêm món

    const onSubmit = (values, formAction) => {
        const productExist = listProduct.find(
            (item) => item.name.toLowerCase() === values.name.toLowerCase()
        );
        if (productExist) {
            formAction.setSubmitting(false);
            return message.error({
                content: `Sản phẩm đã tồn tại`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        }

        dispatch(addNewProduct(values));
        message.success({
            content: `Thêm thành công`,
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
