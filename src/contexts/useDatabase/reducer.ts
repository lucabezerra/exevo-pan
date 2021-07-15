import { DatabaseContextState, Action } from './types'
import { filterCharacters } from './utils'

export default (
  state: DatabaseContextState,
  action: Action,
): DatabaseContextState => {
  switch (action.type) {
    case 'INITIAL_CHARACTER_DATA_LOAD':
      return {
        ...state,
        baseCharacterData: action.characterData,
        characterData: action.characterData,
        serverData: action.serverData,
        rareItemData: action.rareItemData,
      }

    case 'INITIAL_HISTORY_DATA_LOAD':
      return {
        ...state,
        baseHistoryData: action.characterData,
        historyData: action.characterData,
        serverData: action.serverData,
        rareItemData: action.rareItemData,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value,
      }

    case 'APPLY_CHARACTER_FILTERS':
      console.log(action.filters)
      return {
        ...state,
        characterData: filterCharacters(
          state.baseCharacterData,
          state.rareItemData,
          action.filters,
        ),
      }

    case 'APPLY_HISTORY_FILTERS':
      console.log(action.filters)
      return {
        ...state,
        characterData: filterCharacters(
          state.baseHistoryData,
          state.rareItemData,
          action.filters,
        ),
      }

    default:
      return { ...state }
  }
}
