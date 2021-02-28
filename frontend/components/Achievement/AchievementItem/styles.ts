import styled from 'styled-components'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

export const Title = styled.p`
  margin-bottom: 5px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 10px;
`

export const SubTitle = styled.p`
  margin-bottom: 0px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 10px;
`

export const Wrapper = styled.div<{ isCompleted: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme, isCompleted }) => isCompleted ? theme.greenBgc : theme.grayBgc};
  margin-bottom: 15px;
  height: 53px;
  ${Title}, ${SubTitle} {
    color: ${({ isCompleted }) => isCompleted ? "#0099FF" : "#BCBCBC"}
  }
`;