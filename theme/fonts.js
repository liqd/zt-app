const baseFontSize = 16;

export const FONTS = {
  familySans: '"SourceSansPro", sans-serif',
  familySerif: '"SourceSerifPro", serif'
};

export const SIZES = {
  sm: baseFontSize * 0.8,
  base: baseFontSize,
  md: baseFontSize * 1.125,
  lg: baseFontSize * 1.5,
  multiplyBy: times => times * baseFontSize
};
