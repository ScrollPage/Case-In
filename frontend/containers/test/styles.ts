import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 30px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const ChooseWrapper = styled.div``

export const SubTitle = styled.p`
  margin: 20px 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`
export const TestLabel = styled.p<{ isActive: boolean }>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  opacity: ${({ isActive }) => isActive ? "1" : "0.5"};
  cursor: pointer;
`
export const List = styled.div`
  display: flex;
  flex-direction: column;
`
