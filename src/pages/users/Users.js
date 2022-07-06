import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CRUD } from "../../components";
import { CHANGE_THEME } from "../../redux/action_types";
const ShowDash = (props) => <>Show Users {props.id}</>
const Users = ({ ...props }) => {
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();
    useEffect(() => {
        /* dispatch({
          type: CHANGE_THEME,
          theme: {
            primaryColor: "red",
          },
        }); */
        console.log("Users Render.");
    }, []);
    return (
        <div>
            <CRUD
                {...props}
                title="Users"
                resource="users"
                filterDefaultValues={{

                }}
                actions={{
                    show: true,
                    edit: true
                }}
                columns={[
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
                        source: "status",
                        label: "Estado",
                    },
                    {
                        source: "phone",
                        label: "Telefono",
                    },
                    {
                        source: "company_id",
                        reference: "companies",
                        label: "Compañia",
                    },
                    {
                        source: "role",
                        label: "Rol",
                    },
                ]}
                show={<ShowDash {...props} />}
            /* {...props} */
            />
        </div>
    );
};
export default Users;
