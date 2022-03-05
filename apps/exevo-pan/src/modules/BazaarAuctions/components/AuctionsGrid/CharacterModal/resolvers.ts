export const resolvers = {
  mount: (name: string): string => `/sprites/mounts/${name}.gif`,
  outfit: (name: string, sex: boolean, type: number): string =>
    `/sprites/outfits/${sex ? 'female' : 'male'}/${name}_${type}.gif`,
}

export const rareSet = {
  mount: new Set([
    'Rift Runner',
    'Phantasmal Jade',
    'Singeing Steed',
    'Neon Sparkid',
    'Vortexion',
    'Phant',
    'Antelope',
  ]),
}
