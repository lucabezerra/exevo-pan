import React from 'react'

export interface DrawerFieldsContextData {
  serverOptions: Option[]
  auctionedItemOptions: Option[]
  imbuementOptions: Option[]
  charmOptions: Option[]
  questOptions: Option[]
  achievementOptions: Option[]
  outfitValues: string[]
  mountValues: string[]
}

type ServerSideProps = Pick<
  DrawerFieldsContextData,
  'serverOptions' | 'auctionedItemOptions'
>

export interface DrawerFieldsProviderProps extends ServerSideProps {
  children: React.ReactNode
}
