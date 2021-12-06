import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import { Tooltip } from 'components/Organisms'
import { tokens } from 'DataDictionary/dictionaries/quest'
import { utilitary, access, bosses, others } from './lists'
import ListedItems from '../ListedItems'
import * as S from '../styles'
import { Grid, Group, Title } from './styles'
import { TooltipProps } from '../types'

const CharacterQuests = ({ items, ...props }: TooltipProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const characterQuests = useMemo(() => new Set<string>([...items]), [items])

  return (
    <Tooltip
      aria-label={common.CharacterCard.Tooltips.labels.quests}
      content={
        <Grid>
          <Group>
            <Title>Utilitary</Title>
            <ListedItems fullList={utilitary} characterSet={characterQuests} />
          </Group>

          <Group>
            <Title>Access</Title>
            <ListedItems fullList={access} characterSet={characterQuests} />
          </Group>

          <Group>
            <Title>Bosses</Title>
            <ListedItems fullList={bosses} characterSet={characterQuests} />
          </Group>

          {!!others.length && (
            <Group>
              <Title>Others</Title>
              <ListedItems fullList={others} characterSet={characterQuests} />
            </Group>
          )}
        </Grid>
      }
    >
      <S.Wrapper {...props}>
        <S.QuestIcon />
        {`Quests: ${items.length}/${tokens.length}`}
      </S.Wrapper>
    </Tooltip>
  )
}

export default CharacterQuests
