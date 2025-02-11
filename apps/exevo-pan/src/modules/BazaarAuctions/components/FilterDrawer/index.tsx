/* eslint-disable jsx-a11y/accessible-emoji */
import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef, useCallback } from 'react'
import {
  Drawer,
  DrawerFooter,
  Chip,
  RangeSliderInput,
  SliderInput,
  Checkbox,
} from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { useDrawerFields } from '../../contexts/useDrawerFields'
import { useFilters } from '../../contexts/useFilters'
import useDebouncedFilter from './useDebouncedFilter'
import useOptionsSet from './useOptionsSet'
import FilterGroup from './FilterGroup'
import SpritePicker from './SpritePicker'
import OutfitControls from './OutfitControls'
import { isHistory } from './utils'
import * as S from './atoms'
import * as Icon from './icons'
import { FilterDrawerProps } from './types'

const FilterDrawer = ({ open, onClose, ...props }: FilterDrawerProps) => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { current: historyPage } = useRef(isHistory())

  const {
    serverOptions,
    auctionedItemOptions,
    imbuementOptions,
    charmOptions,
    questOptions,
    achievementOptions,
    outfitValues,
    storeOutfitValues,
    mountValues,
    storeMountValues,
  } = useDrawerFields()
  const {
    filterState,
    defaultValues,
    activeFilterCount,
    updateFilters,
    toggleAllOptions,
    dispatch,
  } = useFilters()

  const [nickname, setNickname] = useDebouncedFilter<string>(
    'nicknameFilter',
    filterState.nicknameFilter,
  )

  const sexDirectory = filterState.sex ? 'female' : 'male'
  const isFilterReset = activeFilterCount === 0

  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>
        <div className="flex w-full flex-grow items-center justify-between">
          {homepage.FilterDrawer.title}
          <button
            type="button"
            disabled={isFilterReset}
            aria-hidden={isFilterReset}
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="text-onPrimary flex cursor-pointer items-center rounded py-1 px-3 text-[9px] font-bold uppercase tracking-wider shadow-md transition-all hover:shadow-lg active:shadow-inner disabled:invisible disabled:opacity-0"
          >
            {homepage.FilterDrawer.resetFilters}
            <Icon.Reset style={{ marginLeft: 8, marginRight: -4 }} />
          </button>
        </div>
      </Drawer.Head>
      <Drawer.Body className="grid grid-cols-1 gap-4">
        <FilterGroup
          label={homepage.FilterDrawer.labels.searchNickname}
          htmlFor="search-nickname-input"
        >
          <S.Input
            id="search-nickname-input"
            placeholder="Nickname"
            allowClear
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            hasAlert={false}
          />
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.labels.vocation}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.vocation.has(0)}
              onClick={() => updateFilters('vocation', 0)}
            >
              <Icon.Rook />
              None
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(1)}
              onClick={() => updateFilters('vocation', 1)}
            >
              <Icon.Knight />
              Knight
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(2)}
              onClick={() => updateFilters('vocation', 2)}
            >
              <Icon.Paladin />
              Paladin
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(3)}
              onClick={() => updateFilters('vocation', 3)}
            >
              <Icon.Sorcerer />
              Sorcerer
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.vocation.has(4)}
              onClick={() => updateFilters('vocation', 4)}
            >
              <Icon.Druid />
              Druid
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="PvP">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.pvp.has(0)}
              onClick={() => updateFilters('pvp', 0)}
            >
              <Icon.Dove />
              Optional
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(1)}
              onClick={() => updateFilters('pvp', 1)}
            >
              <Icon.WhiteSkull />
              Open
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(2)}
              onClick={() => updateFilters('pvp', 2)}
            >
              <Icon.OrangeSkull />
              Retro Open
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(3)}
              onClick={() => updateFilters('pvp', 3)}
            >
              <Icon.RedSkull />
              Hardcore
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.pvp.has(4)}
              onClick={() => updateFilters('pvp', 4)}
            >
              <Icon.BlackSkull />
              Retro Hardcore
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="BattlEye">
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.battleye.has(true)}
              onClick={() => updateFilters('battleye', true)}
            >
              <Icon.Status color="battleGreen" />
              {homepage.FilterDrawer.green}
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.battleye.has(false)}
              onClick={() => updateFilters('battleye', false)}
            >
              <Icon.Status color="battleYellow" />
              {homepage.FilterDrawer.yellow}
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.labels.serverLocation}>
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.location.has(0)}
              onClick={() => updateFilters('location', 0)}
            >
              <Icon.EuFlag />
              EU
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(1)}
              onClick={() => updateFilters('location', 1)}
            >
              <Icon.NaFlag />
              NA
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.location.has(2)}
              onClick={() => updateFilters('location', 2)}
            >
              <Icon.BrFlag />
              BR
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Server" htmlFor="server-input">
          <S.AutocompleteInput
            id="server-input"
            aria-controls="server-list"
            placeholder={homepage.FilterDrawer.placeholders.server}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(serverOptions, filterState.serverSet)}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('serverSet', option.value),
              [updateFilters],
            )}
          />
          <S.ChipWrapper id="server-list">
            {[...filterState.serverSet].map((server) => (
              <Chip
                key={server}
                onClose={() => updateFilters('serverSet', server)}
              >
                {server}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label={homepage.FilterDrawer.labels.storeItems}>
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="Training Dummy"
              checked={filterState.dummy}
              onClick={() => updateFilters('dummy', !filterState.dummy)}
            />
            <Checkbox
              label="Charm Expansion"
              checked={filterState.charmExpansion}
              onClick={() =>
                updateFilters('charmExpansion', !filterState.charmExpansion)
              }
            />
            <Checkbox
              label="Imbuement Shrine"
              checked={filterState.imbuementShrine}
              onClick={() =>
                updateFilters('imbuementShrine', !filterState.imbuementShrine)
              }
            />
            <Checkbox
              label="Gold Pouch"
              checked={filterState.goldPouch}
              onClick={() => updateFilters('goldPouch', !filterState.goldPouch)}
            />
            <Checkbox
              label="Prey Slot"
              checked={filterState.preySlot}
              onClick={() => updateFilters('preySlot', !filterState.preySlot)}
            />
            <Checkbox
              label="Reward Shrine"
              checked={filterState.rewardShrine}
              onClick={() =>
                updateFilters('rewardShrine', !filterState.rewardShrine)
              }
            />
            <Checkbox
              label="Hirelings"
              checked={filterState.hireling}
              onClick={() => updateFilters('hireling', !filterState.hireling)}
            />
            <Checkbox
              label="Hunting Task Slot"
              checked={filterState.huntingSlot}
              onClick={() =>
                updateFilters('huntingSlot', !filterState.huntingSlot)
              }
            />
            <Checkbox
              label="Mailbox"
              checked={filterState.mailbox}
              onClick={() => updateFilters('mailbox', !filterState.mailbox)}
            />
            <Checkbox
              label="Regular world transfer"
              checked={filterState.transferAvailable}
              onClick={() =>
                updateFilters(
                  'transferAvailable',
                  !filterState.transferAvailable,
                )
              }
            />
          </div>
        </FilterGroup>

        {/* @ ToDo: add htmlFor after rangeSlider refactor */}
        <FilterGroup label="Level">
          <RangeSliderInput
            min={8}
            max={2000}
            value={[filterState.minLevel, filterState.maxLevel]}
            onChange={useCallback(
              (values: [number, number]) => {
                const [newMin, newMax] = values
                updateFilters('minLevel', newMin)
                updateFilters('maxLevel', newMax)
              },
              [updateFilters],
            )}
          />
        </FilterGroup>

        <FilterGroup label="Skill" htmlFor="skill-slider">
          <SliderInput
            id="skill-slider"
            aria-label={homepage.FilterDrawer.labels.minSkill}
            min={10}
            max={130}
            value={filterState.minSkill}
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLInputElement>) =>
                updateFilters('minSkill', parseInt(event.target.value, 10)),
              [updateFilters],
            )}
            style={{ marginBottom: 16 }}
          />
          <S.ChipWrapper>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('magic')}
              onClick={() => updateFilters('skillKey', 'magic')}
            >
              <Icon.Magic />
              Magic
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('distance')}
              onClick={() => updateFilters('skillKey', 'distance')}
            >
              <Icon.Distance />
              Distance
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('club')}
              onClick={() => updateFilters('skillKey', 'club')}
            >
              <Icon.Club />
              Club
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('sword')}
              onClick={() => updateFilters('skillKey', 'sword')}
            >
              <Icon.Sword />
              Sword
            </S.IconChip>
            <S.IconChip
              overrideStatus={filterState.skillKey.has('axe')}
              onClick={() => updateFilters('skillKey', 'axe')}
            >
              <Icon.Axe />
              Axe
            </S.IconChip>
          </S.ChipWrapper>
        </FilterGroup>

        <SpritePicker
          title="Outfits"
          spriteDirectory={`outfits/${sexDirectory}`}
          directorySuffix={`_${filterState.addon}`}
          filterKey="outfitSet"
          options={outfitValues}
        >
          <OutfitControls />
        </SpritePicker>

        <SpritePicker
          title="Store Outfits"
          spriteDirectory={`storeoutfits/${sexDirectory}`}
          directorySuffix="_3"
          filterKey="storeOutfitSet"
          options={storeOutfitValues}
        >
          <OutfitControls disableAddons />
        </SpritePicker>

        <SpritePicker
          title="Mounts"
          spriteDirectory="mounts"
          filterKey="mountSet"
          options={mountValues}
        />

        <SpritePicker
          title="Store Mounts"
          spriteDirectory="storemounts"
          filterKey="storeMountSet"
          options={storeMountValues}
        />

        <FilterGroup label="Imbuements" htmlFor="imbuements-input">
          <S.InputWrapper>
            <S.AutocompleteInput
              id="imbuements-input"
              aria-controls="imbuements-list"
              placeholder={homepage.FilterDrawer.placeholders.imbuements}
              itemList={useOptionsSet(
                imbuementOptions,
                filterState.imbuementsSet,
              )}
              onItemSelect={useCallback(
                (option: Option) =>
                  updateFilters('imbuementsSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={
                filterState.imbuementsSet.size === imbuementOptions.length
              }
              onClick={() =>
                toggleAllOptions('imbuementsSet', imbuementOptions)
              }
            >
              {homepage.FilterDrawer.toggleAll.imbuements}
            </Chip>
          </S.InputWrapper>
          <S.ChipWrapper id="imbuements-list">
            {[...filterState.imbuementsSet].map((imbuement) => (
              <Chip
                key={imbuement}
                onClose={() => updateFilters('imbuementsSet', imbuement)}
              >
                {imbuement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Charms" htmlFor="charms-input">
          <S.InputWrapper>
            <S.AutocompleteInput
              id="charms-input"
              aria-controls="charms-list"
              placeholder={homepage.FilterDrawer.placeholders.charms}
              itemList={useOptionsSet(charmOptions, filterState.charmsSet)}
              onItemSelect={useCallback(
                (option: Option) => updateFilters('charmsSet', option.value),
                [updateFilters],
              )}
            />
            <Chip
              overrideStatus={
                filterState.charmsSet.size === charmOptions.length
              }
              onClick={() => toggleAllOptions('charmsSet', charmOptions)}
            >
              {homepage.FilterDrawer.toggleAll.charms}
            </Chip>
          </S.InputWrapper>
          <S.ChipWrapper id="charms-list">
            {[...filterState.charmsSet].map((charm) => (
              <Chip
                key={charm}
                onClose={() => updateFilters('charmsSet', charm)}
              >
                {charm}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup label="Quests" htmlFor="quest-input">
          <S.AutocompleteInput
            id="quest-input"
            aria-controls="quest-list"
            placeholder={homepage.FilterDrawer.placeholders.quests}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(questOptions, filterState.questSet)}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('questSet', option.value),
              [updateFilters],
            )}
          />
          <S.ChipWrapper id="quest-list">
            {[...filterState.questSet].map((quest) => (
              <Chip
                key={quest}
                onClose={() => updateFilters('questSet', quest)}
              >
                {quest}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        <FilterGroup
          label={homepage.FilterDrawer.labels.rareAchievements}
          htmlFor="achievements-input"
        >
          <S.AutocompleteInput
            id="achievement-input"
            aria-controls="achievement-list"
            placeholder={homepage.FilterDrawer.placeholders.achievements}
            style={{ marginBottom: 12 }}
            itemList={useOptionsSet(
              achievementOptions,
              filterState.achievementSet,
            )}
            onItemSelect={useCallback(
              (option: Option) => updateFilters('achievementSet', option.value),
              [updateFilters],
            )}
          />
          <S.ChipWrapper id="achievement-list">
            {[...filterState.achievementSet].map((achievement) => (
              <Chip
                key={achievement}
                onClose={() => updateFilters('achievementSet', achievement)}
              >
                {achievement}
              </Chip>
            ))}
          </S.ChipWrapper>
        </FilterGroup>

        {!historyPage && (
          <FilterGroup
            label={homepage.FilterDrawer.labels.rareItems}
            htmlFor="rare-items-input"
            labelSuffix={
              <Tooltip
                offset={[0, 8]}
                placement="top"
                content={homepage.FilterDrawer.tooltips.rareItems}
              >
                <Icon.Exclamation />
              </Tooltip>
            }
          >
            <S.InputWrapper>
              <S.AutocompleteInput
                id="rare-items-input"
                aria-controls="rare-items-list"
                placeholder={homepage.FilterDrawer.placeholders.rareItems}
                itemList={useOptionsSet(
                  auctionedItemOptions,
                  filterState.itemSet,
                )}
                onItemSelect={useCallback(
                  (option: Option) => updateFilters('itemSet', option.value),
                  [updateFilters],
                )}
              />
              <Chip
                overrideStatus={
                  filterState.itemSet.size === auctionedItemOptions.length
                }
                onClick={() =>
                  toggleAllOptions('itemSet', auctionedItemOptions)
                }
              >
                {homepage.FilterDrawer.toggleAll.items}
              </Chip>
            </S.InputWrapper>
            <S.ChipWrapper id="rare-items-list">
              {[...filterState.itemSet].map((item) => (
                <Chip key={item} onClose={() => updateFilters('itemSet', item)}>
                  {item}
                </Chip>
              ))}
            </S.ChipWrapper>
          </FilterGroup>
        )}

        <FilterGroup
          label={homepage.FilterDrawer.labels.misc}
          style={{ border: 'none' }}
        >
          <S.ChipWrapper>
            <Tooltip
              style={{ width: 280 }}
              content={homepage.FilterDrawer.tooltips.rareNicknames}
            >
              <Chip
                overrideStatus={filterState.rareNick}
                onClick={() => updateFilters('rareNick', !filterState.rareNick)}
              >
                {homepage.FilterDrawer.rareNicknamesButton}
              </Chip>
            </Tooltip>
            <Tooltip content={homepage.FilterDrawer.tooltips.soulwar}>
              <Chip
                overrideStatus={filterState.soulwarAvailable}
                onClick={() => {
                  if (filterState.soulwarAvailable) {
                    updateFilters('minLevel', defaultValues.minLevel as number)
                    updateFilters('soulwarAvailable', false)
                  } else {
                    updateFilters('minLevel', 250)
                    updateFilters('maxLevel', defaultValues.maxLevel as number)
                    updateFilters('soulwarAvailable', true)
                  }
                }}
              >
                {homepage.FilterDrawer.soulwarButton}
                <S.Emoji
                  role="img"
                  aria-label={homepage.FilterDrawer.skullEmoji}
                >
                  💀
                </S.Emoji>
              </Chip>
            </Tooltip>
          </S.ChipWrapper>
        </FilterGroup>
      </Drawer.Body>
      <DrawerFooter className="flex-none" />
    </Drawer>
  )
}

export default memo(FilterDrawer)
