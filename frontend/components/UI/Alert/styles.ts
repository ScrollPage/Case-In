import { typeOfType } from "@/store/actions/alert";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 900;
  @media (max-width: 900.98px) {
    left: 10px;
    top: 10px !important;
    right: 10px;
  }
`;

export const Content = styled.div<{ type: typeOfType }>`
  position: relative;
  padding: 12px 50px 12px 20px;
  @media (max-width: 900.98px) {
    padding: 12px;
  }
  flex-direction: column;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 273px;
  background-color: ${({ type, theme }) => type === 'success' ? theme.green : type === 'warning' ? theme.yellow : theme.red};
  
`;

export const Text = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
  @media (max-width: 900.98px) {
    font-size: 15px;
  }
  margin-bottom: 20px;
`;

export const Close = styled.div`
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  &:after {
    content: '';
    position: absolute;
    height: 18px;
    width: 3px;
    background-color: #fff;
    transform: rotate(45deg)
  }
  &:before {
    content: '';
    position: absolute;
    height: 18px;
    width: 3px;
    background-color: #fff;
    transform: rotate(-45deg)
  }
`;



