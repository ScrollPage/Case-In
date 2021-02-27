import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 43px;
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin-bottom: 40px;
  .ant-select {
    width: 300px !important;
    margin-bottom: 21px;
    @media (max-width: 575.98px) {
      width: 228px !important;
      margin-bottom: 15px;
    }
  }
  .ant-select-selector {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 10px !important;
    height: 45px !important;
  }
  .ant-select-selection-item {
    margin-left: 10px;
    line-height: 42px !important;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
  @media (max-width: 575.98px) {
    padding: 20px;
  }
`;
export const Title = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 34px;
  margin-top: 10px;
  @media (max-width: 575.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
