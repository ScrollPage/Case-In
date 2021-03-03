import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
`;

export const Title = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 15px;
  }
`

export const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
