import React from "react";
import {
    DatePicker,
    Form,
    Input,
    TimePicker,
    Select,
    Upload,
    Button,
    Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Thumb from "../components/Thumb";

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const CreateAntField = (AntComponent) => ({
    field,
    form,
    hasFeedback,
    label,
    selectOptions,
    submitCount,
    btnSubmit,
    type,
    ...props
}) => {
    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    let hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;
    const onInputChange = ({ target: { value } }) =>
        form.setFieldValue(field.name, value);
    const onChange = (value) => form.setFieldValue(field.name, value);
    const onBlur = () => form.setFieldTouched(field.name, true);
    const inputFile = React.createRef();
    return (
        <div className="field-container">
            <FormItem
                label={label}
                hasFeedback={
                    (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
                }
                help={submittedError || touchedError ? hasError : false}
                validateStatus={submittedError || touchedError ? "error" : "success"}
            >
                {field.name === "image" || field.name === "xls" ? (
                    <>
                        <input
                            id="image"
                            name={field.name}
                            type="file"
                            onChange={(event) => {
                                form.setFieldValue(
                                    `${field.name}`,
                                    event.currentTarget.files[0]
                                );
                                btnSubmit && !hasError && btnSubmit.current.click();
                            }}
                            ref={inputFile}
                            style={{ display: "none" }}
                        />
                        <Button
                            size="middle"
                            onClick={() => {
                                inputFile.current.click();
                            }}
                            icon={<UploadOutlined />}
                        >
                            Tải File
                        </Button>
                        {hasError && (
                            <div className="errorMessage">
                                <Text type="danger">{hasError}</Text>
                            </div>
                        )}
                        {field.name === "image" && !hasError && (
                            <Thumb file={form.values.image} />
                        )}
                    </>
                ) : (
                    <AntComponent
                        {...field}
                        {...props}
                        type={type}
                        onBlur={onBlur}
                        onChange={type ? onInputChange : onChange}
                    >
                        {selectOptions &&
                            selectOptions.map((item) => (
                                <Option key={item._id}>{item.name}</Option>
                            ))}
                    </AntComponent>
                )}
            </FormItem>
        </div>
    );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const UploadFile = CreateAntField(Upload);
