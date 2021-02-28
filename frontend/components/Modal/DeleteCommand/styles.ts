import styled from 'styled-components';
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Title = styled.h3`
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 34px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`

export const Inner = styled.div`
  display: flex;
  ${Button} + ${Button} {
    margin-left: 20px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

