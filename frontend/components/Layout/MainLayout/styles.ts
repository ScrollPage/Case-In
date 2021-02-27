import styled from "styled-components";
import { Wrapper as Button } from '@/components/UI/Button/styles'

export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.blueBgc};
`;
export const Header = styled.div`
  z-index: 401;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FAFCFF;
  background-color: ${({ theme }) => theme.blueBgc};
  @media (max-width: 575.98px) {
    height: 80px; 
  }
`
export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Flex = styled.div`
  padding-top: 145px;
  display: flex;
  height: 100%;
  @media (max-width: 575.98px) {
    padding-top: 100px;
    height: calc(100vh);
  }
`;

export const Hero = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 575.98px) {
    display: none;
  }
`;

export const Name = styled.p`
  margin: 0 0 0 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  > a {
    color: #000; 
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;

export const HeaderMain = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
  @media (max-width: 575.98px) {
    justify-content: flex-end;
  }
`;

export const HeaderSide = styled.div`
  display: flex;
  align-items: center;
  > ${Button} {
    @media (max-width: 575.98px) {
      display: none;
    }
  }
`;

export const Logo = styled.div`
  @media (max-width: 575.98px) {
    > a > img {
    width: 172px;
    }
  }
`;
export const Main = styled.div`
  flex: 1;
  padding-bottom: 40px;
  height: calc(100vh - 145px);
  max-width: 100%;
  @media (max-width: 575.98px) {
    padding-bottom: 10px;
  }
`;

export const SideLink = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) => isActive ? theme.lightBlue : 'transparent'};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 20px;
  padding: 10px 23px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme && theme.lightBlue};
  }
  transition: background-color 0.3s ease;
  > a {
    color: #000;
  }
`;

export const SideBar = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  padding-right: 60px;
  transition: all 0.4s ease;
  @media (max-width: 575.98px) {
    padding-top: 100px;
    padding-right: 18px;
    align-items: flex-end;
    width: 182px;
    position: fixed;
    z-index: 400;
    top: 0;
    left: ${({ isOpen }) => isOpen ? '0' : '100%'};
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  > ${Button} {
    display: none;
    @media (max-width: 575.98px) {
      display: block;
    }
  }
`;
export const Notify = styled.button`
  outline: none;
  border: none;
  height: 41px;
  width: 41px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  margin-right: 30px;
  @media (max-width: 575.98px) {
    margin-right: 0px;
  }
`;

export const MenuOpen = styled.div`
  z-index: 500;
  display: none;
  margin-left: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 9px;
  height: 41px;
  cursor: pointer;
  > div {
    &:nth-child(1) {
      width: 46px;
      height: 4px;
      background-color: #000;
      border-radius: 2px;
    }
    &:nth-child(2) {
      width: 32px;
      height: 4px;
      background-color: #000;
      border-radius: 2px;
    }
  }
  @media (max-width: 575.98px) {
    display: flex;
  }
`
