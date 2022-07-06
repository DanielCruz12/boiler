import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { CRUD } from "../../components";
import { CHANGE_THEME } from "../../redux/action_types";
const ShowDash = (props) => <>Show Users {props.id}</>
const Properties = ({ ...props }) => {
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();

    const columns=[
        {
            source: 'id',
            label: 'Id',
        },
        {
            source: 'company_id',
            label: 'Compañia'
        },
        {
            source: 'selling',
            label: 'En venta',
        },
        {
            source: 'renting',
            label: 'En Renta',
        },
        {
            source: 'type_id',
            label: 'Tipo de uso',
        },
        {
            source: 'city_id',
            label: 'Ciudad',
        },
    ];
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
            <CRUD
                {...props}
                title="Propiedades"
                resource="properties"
                filterDefaultValues={{

                }}
                actions={{
                    show: true,
                    edit: true
                }}
                columns={[
                 
                    ...columns
                ]}
                show={<ShowDash {...props} />}
            /* {...props} */
            />
        </div>
    );
};
export default Properties;
