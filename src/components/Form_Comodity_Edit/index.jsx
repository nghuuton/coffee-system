import { Button, Form as AntForm, message } from "antd";
import { FastField, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateComodity } from "../../actions/comodityAction";
import { AntInput } from "../../customField/CreateAntField";

const FormComodityEdit = ({ comodity, setVisible, listComodity }) => {
    const [form] = AntForm.useForm();
    const dispatch = useDispatch();
    const initialValues = {
        ...comodity,
        ...comodity.unit,
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống"),
        price: Yup.number()
            .required("Đơn giá không được bỏ trống.")
            .integer("Phải là số")
            .min(1000, "Phải có giá trị hơn 1000"),
        unit: Yup.number().required("Đơn vị tính không được bỏ trống.").min(1),
        unitMath: Yup.string()
            .required("Đơn vị quy ước không được bỏ trống.")
            .matches(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
                "Không được có số."
            ),
    });

    // TODO Cập nhật hàng hóa

    const onSubmit = (values, formAction) => {
        const newListCom = listComodity.filter((item) => item._id !== comodity._id);
        const comExits = newListCom.find(
            (item) => item.name.toLowerCase() === values.name.toLowerCase()
        );
        if (comExits) {
            formAction.setSubmitting(false);
            return message.error({
                content: `Hàng hoá đã tồn tại`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        }
        const unitId = comodity.unit && comodity.unit._id;
        dispatch(updateComodity({ ...values, unitId }, comodity._id));
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
                                type="number"
                                placeholder="Nhập đơn giá"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="unit"
                                label="Đơn vị quy ước"
                                type="number"
                                placeholder="Nhập đơn vị quy ước"
                                hasFeedback={true}
                                component={AntInput}
                            />
                            <FastField
                                name="unitMath"
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
