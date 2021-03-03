import styled from 'styled-components'

export const Inner = styled.div`
    display: flex;
    flex-direction: column;
`
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 18px 12px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`
export const Info = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 10px;
  margin: 0;  
`
export const Title = styled.p`
  margin: 0;
  margin-bottom: 15px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;
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