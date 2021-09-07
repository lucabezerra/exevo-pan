import Image from 'next/image'
import coinsGif from 'assets/tibiaCoins.gif'
import { links } from 'Constants'
import * as S from './styles'

const CtaButton = ({
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>): JSX.Element => (
  <S.Button
    href={links.COINS_REF}
    target="_blank"
    rel="noopener external nofollow"
    {...props}
  >
    <S.ImgWrapper>
      <Image src={coinsGif} priority alt="Tibia Coins" width="24" height="24" />
    </S.ImgWrapper>
    Buy Tibia Coins
  </S.Button>
)

export default CtaButton