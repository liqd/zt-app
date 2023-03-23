import { PixelRatio } from 'react-native'

const pixelRatio = PixelRatio.getFontScale()

export const FONTS = {
  familySans: 'SourceSansPro_400Regular',
  familySemiBold: 'SourceSansPro_600SemiBold',
}

export const SIZES = {
  xs: pixelRatio * 13,
  sm: pixelRatio * 16,
  base: pixelRatio * 18,
  md: pixelRatio * 20,
  lg: pixelRatio * 22,
  xl: pixelRatio * 28,
  xxl: pixelRatio * 34,
}

export const LINEHEIGHTS = {
  sm: pixelRatio * 21,
  base: pixelRatio * 22,
  md: pixelRatio * 24,
  lg: pixelRatio * 28,
  xl: pixelRatio * 30,
}

export const LETTERSPACING = {
  iconbtn: 5,
}
