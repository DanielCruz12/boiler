import styled from "styled-components";

export const WrapperDashboardLayout = styled.div`
  & .top-bar {
    padding: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px !important;
  }
  & .logo-container {
    width: 100%;
    padding: 10px 0px;
    margin: 0px 10px 0px 0px;
    background-size: 100% 100% !important;
    height: 60px !important;
    background-repeat: no-repeat !important;
  }
  ${({ theme }) => `
    & .ant-layout-sider{
      background:${theme.primaryColor}!important;
    };
    & .ant-layout-sider .ant-menu,  .ant-layout-sider .ant-menu-item{
      background:${theme.primaryColor}!important;
    }
    & .top-bar{
      background:${theme.primaryColor}!important;
    }
    & .ant-layout-sider .anticon{
      color:${
        theme.menuItemIconColor || theme.secundaryColor || "white"
      }!important;
    }
    & .ant-layout-sider .ant-menu-item-active{
      background:${
        theme.menuItemColor || theme.secundaryColor || "rgba(0, 0, 0, 0.25)"
      }!important;
    }
  `}
`;
export const WrapperFullscreenLayout = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => `
    background-color: ${theme.primaryColor}!important;
  `}
`;
export const WrapperMenuRight = styled.div``;
