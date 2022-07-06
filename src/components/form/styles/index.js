import styled from "styled-components";
export const WrapperForm = styled.div`
  box-shadow: 3px 3px 3px #ebebeb;
  border-radius: 8px;
  padding: 10px 16px;
  border: 1px solid #e5e5e5;
  background: #fff;
  & .item-field {
    margin-bottom: 8px !important;
    display: ${({ layout }) =>
      layout == "vertical"
        ? "inline-block"
        : layout == "horizontal"
        ? "inline-flex"
        : "block"};
  }
  & .btn-submit {
    max-width: calc(100% - 8px) !important;
  }
  & .ant-form-item-control-input-content{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .item-hidden,
  .item-hidden * {
    height: 0px !important;
    min-height: 0px !important;
    width: 0px !important;
    min-width: 0px !important;
    line-height: 0px !important;
    margin: 0px !important;
    padding: 0px !important;
    display: block !important;
  }
`;
