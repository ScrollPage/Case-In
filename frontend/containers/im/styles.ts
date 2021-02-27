import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;
export const Main = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 575.98px) {
    flex: 0;
  }
`;
export const Side = styled.div`
  flex: 0.7;
  margin-right: 30px;
  @media (max-width: 575.98px) {
    margin-right: 0px;
    width: 100%;
    flex: 1;
  }
`;
