const baseFontSize = 16
const baseLineHeight = 20

export const FONTS = {
  familySans: 'SourceSansPro_400Regular',
}

export const SIZES = {
  xs: baseFontSize * 0.8125, // (13)
  sm: baseFontSize * 0.9375, // (15)
  base: baseFontSize,
  md: baseFontSize * 1.0625, // (17)
  lg: baseFontSize * 1.25, // sub-title (20)
  xl: baseFontSize * 1.375, // small title (22)
  xxl: baseFontSize * 1.75, // title (28)
}

export const LINEHEIGHTS = {
  sm: baseLineHeight * 0.95,
  base: baseLineHeight,
  md: baseLineHeight * 1.1,
  lg: baseLineHeight * 1.3,
  xl: baseLineHeight * 1.9,
  multiplyBy: times => times * baseLineHeight
}

export const FONTWEIGHT = {
  base: '300',
  semiBold: '500',
  bold: '800',
}

export const LETTERSPACING = {
  iconbtn: 5,
}
