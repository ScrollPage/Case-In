import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 575.98px) {
    margin-bottom: 10px;
  }
`;
export const Wrapper = styled.div`
  justify-content: space-between;
  background-color: rgba(204, 235, 255, 0.2);
  border-radius: 20px;
  padding: 14px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(204, 235, 255, 0.5);
  }
  transition: background-color .3s ease;
  margin-bottom: 20px;
  @media (max-width: 575.98px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h3`
  margin: 0;
  margin-left: 20px;
  > a {
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 14px;
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;
export const Label = styled.p`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 0px;
`;

