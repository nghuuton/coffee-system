import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadExcel } from "../../actions/productAction";
import { UploadFile } from "../../customField/CreateAntField";
import * as Yup from "yup";

const ImportExcel = () => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const btnSubmit = useRef();
    const initialValues = {
        xls: null,
    };

    const SUPPORTED_FORMATS = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    // TODO import file excel

    const onSubmit = (values, formAction) => {
        dispatch(uploadExcel(values));
        message.success({
            content: `Tải file thành công`,
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
        formAction.resetForm();
        formAction.setSubmitting(false);
    };

    const validationSchema = Yup.object().shape({
        xls: Yup.mixed()
            .nullable()
            .test(
                "fileFormat",
                "Không đúng định dạng file",
                (value) => value && SUPPORTED_FORMATS.includes(value.type)
            ),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={validationSchema}
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
