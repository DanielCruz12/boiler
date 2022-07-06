import styled from "styled-components";
export const WrapperForm = styled.div`
  width: 300px;
  & .form-fotter {
    text-align: center;
  }
  ${({ theme }) => `
    & .btn-submit{
      background:${theme.primaryColor}!important; 
    }
  `}
`;
