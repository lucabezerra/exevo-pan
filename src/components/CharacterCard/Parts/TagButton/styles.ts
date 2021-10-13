import styled from 'styled-components'
import TagSvg from 'assets/svgs/tag.svg'
import { HoveredState } from './types'

export const Icon = styled(TagSvg)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));

  --initialAngle: 0deg;
  animation: swing 1.2s ease-out forwards;
  animation-delay: 1s;
  transform-origin: 50% 0;
  fill: var(--green);

  @keyframes swing {
    0% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
    20% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 5deg));
    }
    30% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 7deg));
    }
    50% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 10deg));
    }

    60% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 15deg));
    }

    70% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 10deg));
    }

    80% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 5deg));
    }

    90% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 2deg));
    }

    100% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
  }
`

export const Wrapper = styled.div<{ animation: HoveredState }>`
  align-self: flex-start;
  flex-shrink: 0;
  height: 44px;
  width: 28px;
  cursor: pointer;
  --initialAngle: 0deg;

  ${Icon} {
    animation: ${({ animation }) => animation} 1s ease-out forwards;
  }

  @keyframes hover {
    0% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
    20% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) -45deg));
    }
    100% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) -45deg));
    }
  }

  @keyframes off {
    0% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) -45deg));
    }

    20% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 30deg));
    }

    40% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 20deg));
    }

    60% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) + 10deg));
    }

    80% {
      transform: rotate3d(0, 0, 1, calc(var(--initialAngle) - 5deg));
    }

    100% {
      transform: rotate3d(0, 0, 1, var(--initialAngle));
    }
  }
`