import { memo } from 'react'
import BaseHero from '../Hero'

const Hero: typeof BaseHero = memo((args) => (
  <BaseHero {...args} className="mt-[42px] md:mt-0 md:pb-8 lg:pb-24" />
))

export default Hero
