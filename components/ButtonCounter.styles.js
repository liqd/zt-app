import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTWEIGHT,LETTERSPACING, LINEHEIGHTS, SIZES } from '../theme/fonts'

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
    fontWeight: FONTWEIGHT.bold
  },
  highlightDownStyle: {
    color: COLORS.danger,
    fontWeight: FONTWEIGHT.bold
  },
})
