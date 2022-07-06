import React, { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import Factory from "./Factory";
import { WrapperForm } from "./styles/";
import Field from "./fields/Field";
import { getService } from "../../services/";
import _ from "lodash";
const SimpleForm = ({
  children,
  id,
  buttonTextSubmit = "Save",
  layout = "vertical",
  successfullyCreatedText,
  successfullyUpdatedText,
  onSubmit,
  displayMessage = true,
  source,
  reference,
  footer,
  fields,
  onChange,
  ...props
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState();
  const [payloads, setPayloads] = useState({});
  const handleOnSubmit = (record) => {
    if (onSubmit && !source) onSubmit(record, form);
    if (source) {
      const service = getService(source);
      if (service) {
        /* let id = record.id || record._id; */
        setSubmitting(true);
        if (id)
          return service
            .patch(id, record)
            .then((res) => {
              if (displayMessage)
                message.success(
                  successfullyUpdatedText || "Record updated successfully!"
                );
              if (onSubmit) onSubmit(res, form);
              setSubmitting(false);
            })
            .catch((error) => {
              message.error(error.message);
              setSubmitting(false);
            });
        service
          .create(record)
          .then((res) => {
            if (displayMessage)
              message.success(
                successfullyCreatedText || "Record created successfully!"
              );
            setSubmitting(false);
            if (onSubmit) onSubmit(res, form);
          })
          .catch((error) => {
            message.error(error.message);
            setSubmitting(false);
          });
      }
    }
  };
  const handleOnChange = (field, value) => {
    setPayloads({
      ...payloads,
      [field]: value,
    });
    if (payloads[field] != value)
      if (onChange) onChange(field, value, payloads, form);
  };
  const getData = () => {
    const service = getService(source || reference);
    setLoading(true);
    service.get(id)
      .then(res => {
        setRecord(res);
        setLoading(false);
      })
      .catch(err => {
        message.error(err.message);
        setLoading(false);
      })
  }
  useEffect(() => {
    if (id) {
      getData();
    } else {
      setRecord({});
    }
  }, [id])
  useEffect(() => {
    if (!_.isEqual(props.record, record))
      setRecord(props.record);
  }, [props.record])
  return (
    <WrapperForm layout={layout}>
      <Form
        {...props}
        form={form}
        layout={layout}
        loading={loading}
        onFinish={(values) => {
          console.log("values::", values);
          handleOnSubmit(values);
        }}
        initialValues={record}
        onFinishFailed={(errors) => {
          console.log("errors::", errors);
        }}
      >
        {!fields
          ? React.Children.map(children, (child) => {
            let { name, source, label } = child.props;
            let {
              flex,
              fullWidth,
              defaultValue,
              rules,
              validate,
              type,
              ...rest
            } = child.props;
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
                key={name || source}
              >
                {React.cloneElement(child, {
                  key: name || source,
                  name: name || source,
                  label,
                  type,
                  record,
                  defaultValue,
                  ...rest,
                  onChange: (field, value) => {
                    handleOnChange(field, value);
                  },
                })}
              </Field>
            );
          })
          : fields.map((field) => {
            return (
              <Factory
                form={form}
                key={field.name || field.source}
                record={record}
                onChange={(field, value) => {
                  handleOnChange(field, value);
                }}
                {...field}
              />
            );
          })}
        <Form.Item className="form-footer">
          {!footer ? (
            <Button
              className="btn-submit"
              block={props.block || true}
              loading={submitting}
              type="primary"
              htmlType="submit"
            >
              {buttonTextSubmit}
            </Button>
          ) : (
            footer
          )}
        </Form.Item>
      </Form>
    </WrapperForm>
  );
};
export default SimpleForm;
