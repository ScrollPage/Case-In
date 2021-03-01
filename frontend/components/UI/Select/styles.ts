import styled from 'styled-components';

export const Wrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width ? width : '300px'};
  margin-bottom: 21px;
  .ant-select-selector, .ant-select-selection-item { 
    border-radius: 10px !important; 
    height: auto !important;
  }

  .ant-select-selection-item-content {
    white-space: pre-wrap !important;
  }
  @media (max-width: 900.98px) {
    width: ${({ width }) => width ? width : '228px'};
    margin-bottom: 15px;
  }
`;