import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import { ManageDataClient } from 'services'
import DatabaseDataReducer from './reducer'
import { buildCharacterData } from './utils'
import { DatabaseContextValues } from './types'

const defaultDatabaseState: DatabaseContextValues = {
  loading: false,
  characterData: [],
  serverData: [],
  rareItemData: {},
  historyData: [],
  dispatch: () => {},
}
const DatabaseContext =
  createContext<DatabaseContextValues>(defaultDatabaseState)

export const DatabaseProvider: React.FC = ({ children }) => {
  const [
    { loading, characterData, serverData, rareItemData, historyData },
    dispatch,
  ] = useReducer(DatabaseDataReducer, {
    loading: defaultDatabaseState.loading,
    baseCharacterData: defaultDatabaseState.characterData,
    characterData: defaultDatabaseState.characterData,
    serverData: defaultDatabaseState.serverData,
    rareItemData: defaultDatabaseState.rareItemData,
    baseHistoryData: defaultDatabaseState.historyData,
    historyData: defaultDatabaseState.historyData,
  })

  const fetchCharacterData = useCallback(async (isHistory: boolean) => {
    dispatch({ type: 'SET_LOADING', value: true })
    try {
      const [freshCharacterData, freshServerArray, freshItemData] =
        await Promise.all([
          isHistory
            ? ManageDataClient.fetchHistoryData()
            : ManageDataClient.fetchCharacterData(),
          ManageDataClient.fetchServerData(),
          ManageDataClient.fetchItemData(),
        ])

      const buildedCharacterData = buildCharacterData(
        freshCharacterData,
        freshServerArray,
      )

      dispatch({
        type: 'INITIAL_DATA_LOAD',
        characterData: buildedCharacterData,
        serverData: freshServerArray,
        rareItemData: freshItemData,
        isHistory,
      })
    } finally {
      dispatch({ type: 'SET_LOADING', value: false })
    }
  }, [])

  const { pathname } = useLocation()
  const [homeLoaded, setHomeLoaded] = useState<boolean>(false)
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false)
  useEffect(() => {
    const isHistory = window.location.pathname === '/bazaar-history'
    if (pathname === '/' && !homeLoaded) {
      setHomeLoaded(true)
      fetchCharacterData(isHistory)
    }
    if (pathname === '/bazaar-history' && !historyLoaded) {
      setHistoryLoaded(true)
      fetchCharacterData(isHistory)
    }
  }, [pathname, fetchCharacterData, homeLoaded, historyLoaded])

  return (
    <DatabaseContext.Provider
      value={{
        loading,
        characterData,
        serverData,
        rareItemData,
        historyData,
        dispatch,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = (): DatabaseContextValues =>
  useContext(DatabaseContext)
