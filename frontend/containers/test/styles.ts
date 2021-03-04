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
  opacity: ${({ isActive }) => isActive ? "1" : "0.5"};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  cursor: pointer;
  display: inline-block;
  margin: 0;
`

export const TestLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

export const CheckMark = styled.div`
  background: #83BF4F;
  border-radius: 3px;
  width: 16px;
  height: 16px;
  display: inline-block;
  position: relative;
  margin-left: 10px;
  &:after, &:before {
    content: "";
    position: absolute;
    background-color: #fff;
    width: 1.5px;
    left: 50%;
    top: 50%;
    border-radius: 1px;
  }
  &:after {
    height: 6px;
    transform: translateX(-220%) translateY(-39%) rotate(-45deg);
  }
  &:before {
    height: 9px;
    transform: translateX(65%) translateY(-50%) rotate(45deg);
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
`