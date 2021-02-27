import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 575.98px) {
    flex-direction: column;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 500px;
  margin-right: 30px;
  @media (max-width: 575.98px) {
    margin-right: 0px;
    width: 100%;
  }
`;

export const Ads = styled.div`
  flex: 1;
`;