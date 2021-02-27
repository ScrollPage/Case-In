import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 575.98px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 450;
    padding: 20px;
    background-color: ${({ theme }) => theme.blueBgc}
  }
`;