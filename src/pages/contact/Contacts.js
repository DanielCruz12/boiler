import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { CRUD } from "../../components";
import { CHANGE_THEME } from "../../redux/action_types";
const ShowDash = (props) => <>Show Users {props.id}</>;
const Contacts = ({ ...props }) => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    /* dispatch({
          type: CHANGE_THEME,
          theme: {
            primaryColor: "red",
          },
        }); */
    console.log("contacts Render.");
  }, []);
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <CRUD
        {...props}
        title="Contactos"
        resource="contacts"
        filterDefaultValues={{}}
        actions={{
          show: true,
          edit: true,
        }}
        columns={[
          {
            source: "id",
            label: "Id",
          },
          {
            source: "first_name",
            label: "Nombre",
          },
          {
            source: "last_name",
            label: "Apellido",
          },
          {
            source: "email",
            label: "Email",
          },
          {
            source: "agent_id",
            reference: "users",
            label: "Agente",
          },
          {
            source: "status",
            label: "Estado",
          },
          {
            source: "cellphone",
            label: "Telefono",
          },
          {
            xtype: "selectfield",
            source: "company_id",
            reference: "companies",
            label: "Compañia",
          },
          {
            source: "type",
            label: "Tipo",
          },
          {
            source: "notes",
            label: "Notas",
          },
        ]}
        show={<ShowDash {...props} />}
      />
    </div>
  );
};
export default Contacts;
