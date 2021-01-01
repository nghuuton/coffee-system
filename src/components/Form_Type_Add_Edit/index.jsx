import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getListProduct } from "../../actions/productAction";
import { addNewType, updateType } from "../../actions/typeAction";
import { AntInput } from "../../customField/CreateAntField";

const FormTypeEdit = ({ typeCurrent, setTypeCurrent, listType }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const initialValues = typeCurrent;
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Tên không được bỏ trống.")
            .matches(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
                "Không được có số."
            ),
    });

    // TODO Thêm, cập nhật loại món

    const onSubmit = (values, formAction) => {
        setTypeCurrent(null);
        if (typeCurrent.name) {
            const newListType = listType.filter((item) => item._id !== typeCurrent._id);
            const typeExits = newListType.find(
                (item) => item.name.toLowerCase() === values.name.toLowerCase()
            );
            if (typeExits) {
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
            dispatch(updateType(typeCurrent._id, values));
            message.success({
                content: `Cập nhật thành công`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        }

        if (!typeCurrent.name) {
            const typeExits = listType.find(
                (item) => item.name.toLowerCase() === values.name.toLowerCase()
            );
            if (typeExits) {
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
            dispatch(addNewType(values));
            message.success({
                content: `Thêm thành công`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        }

        dispatch(getListProduct());
        formAction.resetForm();
        formAction.setSubmitting(false);
    };

    return (
        <div className="form_type">
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
                                label="Tên loại"
                                type="text"
                                placeholder="Nhập tên loại"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="primary"
                            >
                                {typeCurrent.name !== "" ? "Cập nhật" : "Thêm"}
                            </Button>
                        </AntForm>
                    );
                }}
            </Formik>
        </div>
    );
};

export default FormTypeEdit;
