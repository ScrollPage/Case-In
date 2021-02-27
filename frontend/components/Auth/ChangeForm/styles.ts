import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
`;
export const Title = styled.h3`
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 34px;
  @media (max-width: 575.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
