const plugin = require('tailwindcss/plugin')

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgb(var(${variable}) / ${opacityValue})`
    return `rgb(var(${variable}))`
  }
}

module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/templates/**/*.tsx',
    './src/modules/**/*.tsx',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
    },
    /* @ ToDo: remove this 'tw' prefix */
    colors: {
      transparent: 'transparent',
      background: withOpacityValue('--tw-background'),
      surface: withOpacityValue('--tw-surface'),
      onSurface: withOpacityValue('--tw-onSurface'),
      separator: withOpacityValue('--tw-separator'),
      primary: withOpacityValue('--tw-primary'),
      onPrimary: withOpacityValue('--tw-onPrimary'),
      primaryVariant: withOpacityValue('--tw-primaryVariant'),
      darkerPrimary: withOpacityValue('--tw-darkerPrimary'),
      green: withOpacityValue('--tw-green'),
      red: withOpacityValue('--tw-red'),
      alert: withOpacityValue('--tw-alert'),
      battleGreen: withOpacityValue('--tw-battleGreen'),
      battleYellow: withOpacityValue('--tw-battleYellow'),
      primaryVariantHighlight: withOpacityValue(
        '--tw-primaryVariantHighlight)',
      ),
      kwai: withOpacityValue('--tw-kwai'),
      kwaiSurface: withOpacityValue('--tw-kwaiSurface'),
      kwaiVariant: withOpacityValue('--tw-kwaiVariant'),
    },
    extend: {
      transitionProperty: {
        fill: 'fill',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    }),
  ],
}