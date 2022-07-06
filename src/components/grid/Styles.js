import styled from "styled-components";
export const WrapperGrid = styled.div`
  background: #fff;
  padding: 10px;
  box-shadow: 2px 2px 2px #cccccc6e;
  border-radius: 4px;
  overflow: hidden;
  & .ant-table-wrapper {
    padding: 0px;
  }
  & .ant-table-title {
    padding: 0px 16px 0px 8px !important;
  }
  & .grid-title h2 {
    margin-bottom: 10px;
  }
  & .ant-table-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
  }
  & .grid-head,
  .grid-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
`;
