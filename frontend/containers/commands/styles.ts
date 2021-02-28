import styled from 'styled-components';
import { Wrapper as Search } from '@/components/UI/Search/styles';
import { Wrapper as Input } from '@/components/UI/Input/styles';

export const Wrapper = styled.div`
  display: flex;  
  @media (max-width: 900.98px) {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 680px;
  margin-right: 30px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
  @media (max-width: 900.98px) {
    width: 100%; 
    margin-top: 20px;
    order: 1;
  }
`;

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: 900.98px) {
    order: 0;
    > ${Search} {
      margin-right: 0;
      ${Input} {
        width: 100%;
      }
    }
  }
`;