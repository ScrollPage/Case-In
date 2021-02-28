import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 120px;
  background-color: ${({ theme }) => theme.blueBgc};
  position: relative;
`;
export const Hero = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Name = styled.p`
  margin: 0 0 0 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
  }
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;

export const Close = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 20px;
  right: 20px;
  cursor: pointer;
  display: none;
  @media (max-width: 900.98px) {
    display: flex;
  }
  &:after, &:before {
    content: '';
    position: absolute;
    height: 29px;
    width: 1.5px;
    background-color: #000;
    top: 50%;
    left: 50%;
    @media (max-width: 900.98px) {
      height: 18px;
    }
  }
  &:after {
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }
  &:before {
    transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  }
`