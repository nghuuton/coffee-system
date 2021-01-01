import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { upDateProduct } from "../../actions/productAction";
import { AntInput, AntSelect, UploadFile } from "../../customField/CreateAntField";

const FormProductEdit = ({
    product,
    listType,
    listComodity,
    setVisible,
    typeModel,
    listProduct,
}) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const initialValues = product;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    const NULL_FILE = null;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên món không được bỏ trống."),
        price: Yup.number()
            .required("Giá không được bỏ trống.")
            .min(1000, "Tối thiểu ít nhất 1000"),
        comoditys: Yup.array("")
            .required("Hàng hóa không được bỏ trống.")
            .min(1, "Tối thiểu ít nhất một hàng hóa."),
        image: Yup.mixed().test("fileFormat", "Không đúng định dạng file", (value) =>
            value === null ? NULL_FILE === null : SUPPORTED_FORMATS.includes(value.type)
        ),
    });

    // TODO Cập nhật món

    const onSubmit = (values, formAction) => {
        const newListProduct = listProduct.filter((item) => item._id !== product._id);
        const productExits = newListProduct.find(
            (item) => item.name.toLowerCase() === values.name.toLowerCase()
        );
        if (productExits) {
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
        dispatch(upDateProduct(product._id, values));

        message.success({
            content: `Cập nhật thành công`,
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
        setVisible(false);
        formAction.setSubmitting(false);
        formAction.resetForm();
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
                                placeholder="Nhập tên món"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="type"
                                label="Loại"
                                placeholder="Nhập tên món"
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

export default FormProductEdit;
