const baseFontSize = 17;
const baseLineHeight = 22;

export const FONTS = {
  familySans: 'SourceSansPro_400Regular',
};

export const SIZES = {
  xs: baseFontSize * 0.8,
  sm: baseFontSize * 0.85,
  base: baseFontSize,
  md: baseFontSize * 1.2,
  lg: baseFontSize * 1.65,
  xl: baseFontSize * 2,
  multiplyBy: times => times * baseFontSize
};

export const LINEHEIGHTS = {
  sm: baseLineHeight * 0.95,
  base: baseLineHeight,
  md: baseLineHeight * 1.1,
  lg: baseLineHeight * 1.3,
  xl: baseLineHeight * 1.9,
  multiplyBy: times => times * baseLineHeight
};

export const FONTWEIGHT = {
  semiBold: '500',
  bold: '600',
  boldxl: '800',
  boldxxl: 'bold'
};

export const LETTERSPACING = {
  iconbtn: 5,
};
