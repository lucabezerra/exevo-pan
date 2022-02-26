declare type ScrapingTokens = Record<string, string>

declare type Id = {
  male: number
  female: number
}

declare type OutfitToken = {
  name: string
  id: Id
  value: number
}

declare type MountToken = {
  name: string
  id: number
}
