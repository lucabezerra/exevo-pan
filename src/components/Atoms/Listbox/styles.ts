import styled from 'styled-components'
import { Shadow, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  border-radius: 5px;
  overflow: auto;
  ${Shadow}
  ${CustomScrollbar}

  scrollbar-color: var(--primaryVariant) var(--surface);

  ::-webkit-scrollbar {
    background-color: var(--surface);
  }
`