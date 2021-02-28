import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 43px;
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  @media (max-width: 900.98px) {
    padding: 20px;
  }
`;
export const Title = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 23px;
  margin-top: 10px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
