import { useTranslation } from 'next-i18next'
import * as S from './styles'
import { GuildSummaryProps } from './types'

const GuildSummary = ({
  guildName,
  href,
  displayValue,
  diffText,
  label,
  winning,
  ...props
}: GuildSummaryProps): JSX.Element => {
  const { t } = useTranslation('war')

  return (
    <S.Wrapper {...props}>
      <S.GuildName>
        {guildName}
        <S.Link target="_blank" rel="noreferrer noopener" href={href}>
          <S.ExternalIcon />
          {t('GuildSummary.linkText')}
        </S.Link>
      </S.GuildName>
      <S.DisplayNumber winning={winning}>
        {displayValue}
        {!!diffText && (
          <S.Diff title={`${diffText} ${t('GuildSummary.diffTitleSuffix')}`}>
            {diffText}
          </S.Diff>
        )}
      </S.DisplayNumber>
      <S.Label>{label}</S.Label>
    </S.Wrapper>
  )
}

export default GuildSummary
