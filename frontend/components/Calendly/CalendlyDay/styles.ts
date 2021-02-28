import styled from 'styled-components'

export const Event = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Day = styled.div`
  margin-right: 23px;
  flex: 0;
`
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
export const Inner = styled.div`
  padding: 18px 12px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  flex: 1;
  > ${Event} + ${Event} {
    margin-top: 12px;
  }
`

export const Info = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  margin: 0;
`
export const Title = styled.p`
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
`

