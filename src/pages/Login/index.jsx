import { Button, Form as AntForm, message, Space } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { accountLogin } from "../../actions/accountAction";
import { AntInput } from "../../customField/CreateAntField";
import logo from "../../image/ant-design.svg";
import bground from "../../image/bg-image.svg";

const Login = (props) => {
    const dispatch = useDispatch();

    const [form] = AntForm.useForm();
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is valid").required("Email is required."),
        password: Yup.string().required("Password is required."),
    });

    const onSubmit = (values, formAction) => {
        dispatch(accountLogin(values))
            .then((res) => {
                if (res.payload.success) {
                    props.history.replace("/");
                    message.success({
                        content: "Đăng nhập thành công",
                        style: {
                            position: "relative",
                            top: 10,
                            right: "-80vh",
                        },
                    });
                    formAction.resetForm();
                    form.resetFields();
                }
            })
            .catch((err) => {
                message.error({
                    content: "Sai thông tin đăng nhập",
                    style: {
                        position: "relative",
                        top: 10,
                        right: "-80vh",
                    },
                });
            });
        formAction.setSubmitting(false);
    };

    return (
        <>
            <Space></Space>
            <div className="form_login" style={{ background: `url(${bground})` }}>
                <div className="form_login__logo">
                    <img src={logo} alt="ant-degisn-logo" />
                </div>
                <div className="form_login__input">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {(formikProps) => {
                            const { handleSubmit, isValid, isSubmitting } = formikProps;
                            return (
                                <AntForm form={form}>
                                    <FastField
                                        name="email"
                                        label="Email"
                                        type="text"
                                        placeholder="Enter your email"
                                        hasFeedback={true}
                                        component={AntInput}
                                    />
                                    <FastField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        placeholder="Enter your password"
                                        hasFeedback={true}
                                        component={AntInput}
                                    />
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!isValid || isSubmitting}
                                        loading={isSubmitting}
                                        type="primary"
                                    >
                                        Login
                                    </Button>
                                </AntForm>
                            );
                        }}
                    </Formik>
                </div>
            </div>
            <p className="copy_right">Copyright 2020 Coffee System</p>
        </>
    );
};

export default Login;
