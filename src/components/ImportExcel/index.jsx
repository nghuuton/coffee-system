import { Button, Form as AntForm } from "antd";
import { FastField, Formik } from "formik";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadExcel } from "../../actions/productAction";
import { UploadFile } from "../../customField/CreateAntField";

const ImportExcel = () => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const btnSubmit = useRef();
    const initialValues = {
        file: null,
    };

    const onSubmit = (values, formAction) => {
        dispatch(uploadExcel(values));
        formAction.resetForm();
        formAction.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {(formikProps) => {
                const { handleSubmit, isValid, isSubmitting } = formikProps;
                return (
                    <AntForm
                        form={form}
                        encType="multipart/form-data"
                        className="import_excel"
                    >
                        <FastField
                            name="xls"
                            listType="picture"
                            hasFeedback={true}
                            component={UploadFile}
                            btnSubmit={btnSubmit}
                        />
                        <Button
                            ref={btnSubmit}
                            onClick={handleSubmit}
                            disabled={!isValid || isSubmitting}
                            loading={isSubmitting}
                            type="primary"
                        ></Button>
                    </AntForm>
                );
            }}
        </Formik>
    );
};

export default ImportExcel;
