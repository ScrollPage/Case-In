import styled from "styled-components";
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Wrapper = styled.div`
  background: #ffffff;
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
  .ant-picker {
    width: 218px;
    @media (max-width: 575.98px) {
      width: 228px;
    }
  }
`;

export const PickerWrapper = styled.div`
  flex: 1;
  @media (max-width: 575.98px) {
    margin-bottom: 15px;
  }
`
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  ${Button} {
    margin-bottom: 21px;
    @media (max-width: 575.98px) {
      margin-bottom: 0px;
    }
  }
`;

export const SelectWrapper = styled.div`
  width: 300px;
  .ant-select {
    width: 100%;
  }
  @media (max-width: 575.98px) {
    width: 228px;
    margin-bottom: 15px;
  }
`
export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 575.98px) {
    flex-direction: column;
    align-items: center;
  }
`;
