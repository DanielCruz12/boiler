import React, { useEffect, useState } from "react";
import { Form, Skeleton } from "antd";
const Field = ({ fullWidth = false, flex, defaultValue, ...props }) => {
  const [record, setRecord] = useState();
  useEffect(() => {
    if (props.record) {
      setRecord(props.record);
    }
  }, [props.record]);
  /* if (!record) return <Skeleton.Input style={{ width: 200 }} active={"active"} size={"small"} />; */
  return (
    <Form.Item
      {...props}
      className={`${props.type ? "item-" + props.type : ""} ${props.className || "item-field"
        }`}
      style={{
        padding: "0px 4px",
        width: fullWidth ? "100%" : flex ? `${Number(flex) * 100}%` : "50%",
      }}
    >
      {

        record && React.cloneElement(props.child || props.children, {
          defaultValue: record && record[props.name],
          style: {
            width: "100%",
          },
        })}
    </Form.Item>
  );
};
export default Field;
