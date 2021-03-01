import styled from 'styled-components';
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
`;
export const TopMain = styled.div`
  display: flex;
  align-items: center;
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;
export const Hide = styled.div``
export const Header = styled.div`
  margin: 0 0 0 20px;
`;
export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  margin: 0;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
export const Main = styled.div`
  ${Button} {
    margin-bottom: 20px;
    &:last-of-type { 
      margin-bottom: 40px;
    }
  }
`;
export const Stroke = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Change = styled.div`
  cursor: pointer;
`;
export const Label = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  flex: 0.4;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;
export const Info = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  flex: 0.6;
`;
