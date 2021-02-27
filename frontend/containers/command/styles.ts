import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 575.98px) {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-right: 30px;
  @media (max-width: 575.98px) {
    margin-right: 0px;
    width: 100%;
    order: 1;
  }
`;

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: 575.98px) {
    order: 0;
    margin-bottom: 15px;
  }
`;