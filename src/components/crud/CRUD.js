import React, { useEffect, useState } from "react";
import { Wrapper } from "./Styles";
import CrudContext from "./context/CrudContext";
import { Grid } from "../";
import { SimpleForm } from "../form";
import { createHistory, navigate } from "@reach/router";
import { ReloadOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
let history = createHistory(window);
const defaultActions = {
    edit: true,
    create: true,
    remove: true,
    show: true,
}
const CRUD = ({ id, columns, basePath, actionText, actionAlign, rowKey = "_id", fields, ...props }) => {
    const [view, setView] = useState("list");
    const [resource, setResource] = useState();
    const [location, setLocation] = useState();
    const handleOnEdit = id => {
        setView("edit");
        navigate(`/${basePath || "dashboard"}/${resource}/${id}`)
    }
    const handleOnShow = id => {
        setView("show");
        navigate(`/${basePath || "dashboard"}/${resource}/show/${id}`)
    }
    useEffect(() => {
        if (location) {
            if (id) setView("edit");
            if (props._id) setView("show");
        }
    }, [id, props._id, location])
    useEffect(() => {
        if (history.location) {
            let { pathname } = history.location;
            //let path = pathname.replace(/\//i, "");
            //pathname.indexOf('\/dashboard')
            /*  let resource = pathname.substring(pathname.indexOf('/') + 1, )
             console.log("location:", resource) */
            setLocation(history.location);
        }
    }, [history.location]);
    useEffect(() => {
        if (props.resource) {
            setResource(props.resource);
        }
    }, [props.resource])
    return (
        <Wrapper>
            {
                view == "show" && props.show && <div className="show-layout">
                    {React.cloneElement(props.show, {
                        id: props._id
                    })}
                </div>
            }
            {
                (view == "create" || view == "edit") && (props.create || props.edit || <SimpleForm
                    id={id != "create" ? id : undefined}
                    source={resource}
                    fields={fields || columns}>
                </SimpleForm>)
            }
            {view == "list" && <Grid
                onChangeRoute={location => {
                    console.log("??", location)
                    setLocation(location)
                }}
                extra={<>
                    <Button
                        type="link"
                        shape="circle"
                        onClick={() => {
                            navigate(`/dashboard/${resource}/create`);
                        }}
                        icon={<PlusCircleOutlined />} />
                </>}
                resource={resource}
                columns={columns}
                {...props}
            />}
        </Wrapper>
    );
}
export default CRUD;