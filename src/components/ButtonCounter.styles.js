import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, LETTERSPACING, LINEHEIGHTS, SIZES } from '../theme/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    letterSpacing: LETTERSPACING.iconbtn,
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
  },
  disableStyle: {
    color: COLORS.grey.light
  },
  highlightUpStyle: {
    color: COLORS.primary,
    fontFamily: FONTS.familySemiBold
  },
  highlightDownStyle: {
    color: COLORS.danger,
    fontFamily: FONTS.familySemiBold
  },
})
