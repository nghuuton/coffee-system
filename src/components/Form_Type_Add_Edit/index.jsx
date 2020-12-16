import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getListProduct } from "../../actions/productAction";
import { addNewType, updateType } from "../../actions/typeAction";
import { AntInput } from "../../customField/CreateAntField";

const FormTypeEdit = ({ typeCurrent, setTypeCurrent }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const initialValues = typeCurrent;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required."),
    });

    const onSubmit = (values, formAction) => {
        setTypeCurrent(null);
        if (typeCurrent.name) {
            dispatch(updateType(typeCurrent._id, values));
            message.success({
                content: `Cập nhật thành công`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        } else {
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
