import React from "react";
import Field from "./fields/Field";
import * as fields from "./fields/";
import { Input } from "antd";
const Factory = ({
  name,
  source,
  label,
  flex,
  fullWidth,
  defaultValue,
  rules,
  validate,
  type,
  xtype,
  form,
  record,
  ...props
}) => {
  return (
    <Field
      rules={rules}
      fullWidth={fullWidth}
      flex={flex}
      label={label}
      name={source || name}
      form={form}
      defaultValue={defaultValue}
      type={type}
      record={record}
    >
      {React.createElement(fields[xtype || "textfield"], {
        name: name || source,
        label,
        type,
        defaultValue,
        /*  form:props.form,
         */
        record,
        ...props,
        onChange: (value) => {
          if (props.onChange) props.onChange(name || source, value);
        },
      })}
    </Field>
  );
};
export default Factory;
