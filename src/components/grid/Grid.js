import React, { useState, useEffect } from "react";
import { Button, message, Pagination, Table, Divider, Modal } from "antd";
import { ReloadOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { WrapperGrid } from "./Styles";
import _ from "lodash";
import { getService } from "../../services/";
import { navigate } from "@reach/router";
const defaultActions = {
  edit: true,
  create: true,
  remove: true,
  show: true,
}
const Grid = ({
  resource,
  showRefres = true,
  perPage = 10,
  title,
  actionText = 'Acciones',
  actionAlign = 'right',
  rowKey = "_id",
  reference,
  basePath,
  extra,
  onChangeRoute,
  ...props
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState();
  const [path, setPath] = useState();
  const [initialized, setInitialized] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    $skip: 0,
  });
  const [filterDefaultValues, setFilterDefaultValues] = useState();
  const getData = async () => {
    try {
      const service = getService(resource || reference);
      setLoading(true);
      let res = await service.find({
        query: {
          ...filterDefaultValues,
          $limit: pagination.pageSize || props.pageSize || perPage,
          $skip: pagination.$skip || 0,
        },
      });
      setLoading(false);
      if (!initialized) setInitialized(true);
      if (Array.isArray(res)) {
        setPagination({
          ...pagination,
          total: res.length,
        });
        return setDataSource(res);
      }
      if (res.data) {
        setPagination({
          ...pagination,
          total: res.total,
        });
        setDataSource(res.data);
      }
    } catch (err) {
      setLoading(false);
      message.error(err.message);
    }
  };
  const handleChangePagination = (page, pageSize) => {
    let $skip = (page - 1) * pageSize;
    setPagination({
      ...pagination,
      current: page,
      pageSize,
      $skip,
    });
    setFilterDefaultValues({
      ...filterDefaultValues,
      $skip,
      $limit: pageSize,
    });
  };
  const handleOnEdit = (record) => {
    navigate(`/${basePath || "dashboard"}${path}/${record[rowKey]}`)
  }
  const handleOnShow = (id) => {
    navigate(`/${basePath || "dashboard"}${path}/show/${id}`)
  }
  const handleOnRemove = (id) => {
    Modal.confirm({
      content: "Desea eliminar el registro?",
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk: () => {
        const service = getService(resource || reference);
        service.remove(id)
          .then(() => {
            message.success("Registro eliminado con éxito");
            getData();
          }).catch(err => {
            message.error(err.message);
          })
      }
    })
  }
  useEffect(() => {
    if (!_.isEqual(props.columns, columns)) {
      setColumns(
        props.columns.map(({ dataIndex, ...it }) => ({
          ...it,
          dataIndex: it.source || it.dataIndex,
          title: it.label || it.title,
        })),

      );
    }
  }, [props.columns]);
  useEffect(() => {
    if (!_.isEqual(props.dataSource, dataSource)) {
      setDataSource(props.dataSource);
    }
  }, [props.dataSource]);
  useEffect(() => {
    if (!_.isEqual(props.filterDefaultValues, filterDefaultValues)) {
      setFilterDefaultValues(props.filterDefaultValues);
    }
  }, [props.filterDefaultValues]);
  useEffect(() => {
    setPagination({
      ...pagination,
      pageSize: props.pageSize || perPage,
    });
  }, [props.pageSize, perPage]);
  useEffect(() => {
    if (!filterDefaultValues) return getData();
    if (!_.isEqual(props.filterDefaultValues, filterDefaultValues)) getData();
  }, [filterDefaultValues]);
  useEffect(() => {
    if (!_.isEqual(props.actions, actions)) {
      if (typeof props.actions == "object")
        setActions({
          ...defaultActions,
          ...props.actions
        });
    }
  }, [props.actions])
  useEffect(() => {
    setPath(props.path || resource || reference);
  }, [props.path]);
  useEffect(() => {
    if (onChangeRoute && props.location) onChangeRoute(props.location);
  }, [props.location])
  return (
    <WrapperGrid>
      <Table
        {...props}
        title={() => (
          <div className="grid-head">
            {title && (
              <div className="grid-title">
                <h2>{title}</h2>
              </div>
            )}
            <div className="grid-actions">
              {extra}
              {showRefres && (
                <Button
                  type="link"
                  loading={loading}
                  onClick={() => getData()}
                  icon={<ReloadOutlined />}
                />
              )}
            </div>
          </div>
        )}
        rowKey={rowKey}
        loading={loading}
        dataSource={dataSource}
        columns={[...columns,
        actions &&
        {
          title: actionText,
          key: 'action',
          width: 150,
          fixed: actionAlign,
          render: (value, record) => (
            <span>
              {actions && actions.edit && <Button
                onClick={() => handleOnEdit(record)}
                type="link" shape="circle" icon={<EditOutlined />} />}
              {actions && actions.remove && actions.show && <Divider type="vertical" />}
              {actions && actions.remove && <Button
                onClick={() => handleOnRemove(record[rowKey])}
                type="link" shape="circle" icon={<DeleteOutlined />} />}
              {actions && actions.show && <Divider type="vertical" />}
              {actions && actions.show && <Button
                onClick={() => handleOnShow(record[rowKey])}
                type="link" shape="circle" icon={<EyeOutlined />} />}
              {actions && actions.extra && actions.extra(record)}
            </span>
          ),
        }].filter(it => (typeof it !== "undefined"))}
        size={props.size || "small"}
        pagination={false}
        footer={() => (
          <div>
            {initialized && (
              <Pagination
                pageSize={
                  pagination.pageSize || props.pageSize || perPage || 10
                }
                defaultCurrent={1}
                total={pagination.total}
                current={pagination.current}
                showSizeChanger={props.showSizeChanger || true}
                onChange={handleChangePagination}
              />
            )}
          </div>
        )}
      />
    </WrapperGrid>
  );
};

export default Grid;
