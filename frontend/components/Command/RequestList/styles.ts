import styled from 'styled-components';
import { Wrapper as RequestItem } from '../RequestItem/styles';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 720px;
  margin-right: 41px;
  background: #EBF7FF;
  border-radius: 20px 0 0 20px;
  padding: 20px 30px;
  z-index: 600;
  max-height: 425px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    height: 90%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0099FF;
  }
  ${RequestItem} {
    &:last-of-type {
      border-bottom: none;
    }
    &:first-of-type {
      padding-top: 0;
    }
  }
  @media (max-width: 575.98px) {
    position: fixed;
    left: 10px;
    right: 10px;
    top: 10px;
    width: auto;
    margin-right: 0px;
    border-radius: 20px;
  }
`;
export const Close = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 15px;
  right: 15px;
  cursor: pointer;
  display: none;
  @media (max-width: 575.98px) {
    display: block;
  }
  &:after, &:before {
    content: '';
    position: absolute;
    height: 29px;
    width: 1.5px;
    background-color: #000;
    top: 50%;
    left: 50%;
    @media (max-width: 575.98px) {
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