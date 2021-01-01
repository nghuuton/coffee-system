import { Button, DatePicker, Divider, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createNewUser } from "../../actions/staffAction";
import { AntInput, AntSelect } from "../../customField/CreateAntField";
import moment from "moment";

const FormAddUser = ({ setVisible }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const optionSex = [
        { _id: true, name: "Nam" },
        { _id: false, name: "Nữ" },
    ];
    const optionType = [
        { _id: 1, name: "Nhân viên phục vụ" },
        { _id: 2, name: "Nhân viên quầy" },
        { _id: 3, name: "Nhân viên thu ngân" },
    ];
    const initialValues = {
        firstname: "",
        lastname: "",
        sex: "true",
        email: "",
        type: "1",
        password: "",
        birthday: moment(Date.now()),
    };
    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required("Họ không được bỏ trống.")
            .min(8, "Tối thiểu 8 kí tự trở lên.")
            .max(18, "Tối đa 18 kí tự.")
            .matches(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
                "Không được có số."
            ),
        lastname: Yup.string()
            .required("Tên kkhông được bỏ trống.")
            .min(2, "Tối thiểu 2 kí tự trở lên.")
            .max(5, "Tốida 5 kí tự.")
            .matches(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
                "Không được có số."
            ),
        email: Yup.string()
            .required("Email không được bỏ trống.")
            .email("Không đúng định dạng email."),
        password: Yup.string().required("Password không được bỏ trống."),
    });

    // TODO Thêm người dùng

    const onSubmit = (values, formAction) => {
        dispatch(createNewUser(values))
            .then((data) => {
                if (data)
                    message.success({
                        content: `Thêm thành công`,
                        style: {
                            position: "relative",
                            top: 10,
                            right: "-80vh",
                        },
                    });
            })
            .catch((err) => {
                message.error({
                    content: "Email đã tồn tại",
                    style: {
                        position: "relative",
                        top: 10,
                        right: "-80vh",
                    },
                });
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
                        <AntForm form={form}>
                            <FastField
                                name="firstname"
                                label="Họ tên"
                                type="text"
                                placeholder="Eg: Nguyễn Hữu"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="lastname"
                                label="Tên"
                                type="text"
                                placeholder="Eg: Tôn"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="sex"
                                label="Giới tính"
                                placeholder="Eg: Nam"
                                hasFeedback={true}
                                selectOptions={optionSex}
                                component={AntSelect}
                            />
                            <label htmlFor="birthday">Ngày sinh: </label>
                            <FastField
                                name="birthday"
                                defaultValue={moment("1998-07-25")}
                                placeholder="Eg: 14/3/2020"
                                hasFeedback={true}
                                selectOptions={optionSex}
                                component={DatePicker}
                                className="input_date"
                            />
                            <Divider />
                            <FastField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Eg: excample@gmail.com"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="password"
                                label="Password"
                                type="password"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="type"
                                label="Chức vụ"
                                hasFeedback={true}
                                component={AntSelect}
                                selectOptions={optionType}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                type="primary"
                            >
                                Thêm
                            </Button>
                        </AntForm>
                    );
                }}
            </Formik>
        </div>
    );
};

export default FormAddUser;
