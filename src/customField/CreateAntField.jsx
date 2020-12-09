import React from "react";
import { DatePicker, Form, Input, TimePicker, Select } from "antd";

const { Option } = Select;

const CreateAntField = (AntComponent) => ({
    field,
    form,
    type,
    label,
    hasFeedback,
    selectOptions,
    ...rest
}) => {
    const { name } = field;
    const { errors, touched, handleChange, handleBlur, setFieldValue } = form;
    const showError = errors[name] && touched[name];
    const handlerChange = (values) => {
        setFieldValue(name, values);
    };
    return (
        <Form.Item
            name={name}
            label={label}
            hasFeedback={hasFeedback}
            help={showError && errors[name]}
            validateStatus={showError && "error"}
        >
            {name !== "password" ? (
                <AntComponent
                    {...field}
                    {...rest}
                    onChange={type ? handleChange : handlerChange}
                    onBlur={handleBlur}
                >
                    {selectOptions &&
                        selectOptions.map((item) => (
                            <Option value={item.key} key={item.key}>
                                {item.value}
                            </Option>
                        ))}
                </AntComponent>
            ) : (
                <AntComponent.Password
                    {...field}
                    {...rest}
                    onChange={type ? handleChange : handlerChange}
                    onBlur={handleBlur}
                    allowClear={true}
                >
                    {selectOptions &&
                        selectOptions.map((item) => (
                            <Option value={item.key} key={item.key}>
                                {item.value}
                            </Option>
                        ))}
                </AntComponent.Password>
            )}
        </Form.Item>
    );
};

export const AntSelect = CreateAntField(Select);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntDatePicker = CreateAntField(DatePicker);
