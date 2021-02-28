import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding-top: 111px;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 900.98px) {
    flex-direction: column;
  }
`;

export const Hr = styled.div`
  width: 3px;
  height: 600px;
  background: #C4C4C4;
  margin: 0 85px;
  @media (max-width: 900.98px) {
    display: none;
  }
`;

export const Header = styled.div`
  @media (max-width: 900.98px) {
    margin-bottom: 20px;
  }
`;
export const Main = styled.div``;

export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 60px;
  line-height: 73px;
  margin-bottom: 21px;
  @media (max-width: 900.98px) {
    font-size: 24px;
    line-height: 29px;
    text-align: center;
  }
`;

export const SubTitle = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
`;


