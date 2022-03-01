import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'data-dictionary/dist/dictionaries/imbuement'
import Lister from './Lister'
import * as S from './styles'
import { TooltipProps } from './types'

const CharacterImbuements = ({
  items,
  ...props
}: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.imbuements}
      content={<Lister partialList={items} fullList={tokens} />}
    >
      <S.TitleWrapper {...props}>
        <S.Icons.Imbuement />
        Imbuements: {items.length}/{tokens.length}
      </S.TitleWrapper>
    </Tooltip>
  )
}

export default memo(CharacterImbuements)
