import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-direction: column;
`;

export const Week = styled.h3`
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  margin-bottom: 30px;
`

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

export const List = styled.div`
  display: flex;
  flex-direction: column;
`
export const AddEvent = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.blue};
  cursor: pointer;
  &:after, &:before {
    content: "";
    position: absolute;
    height: 25px;
    width: 5px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
  }
  &:before {
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  }
`;