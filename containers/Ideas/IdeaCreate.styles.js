import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTWEIGHT, LINEHEIGHTS,SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACINGS.multiplyBy(0.75),
    backgroundColor: COLORS.paper
  },
  title: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
    fontWeight: FONTWEIGHT.bold,
  },
  textInputButtonTitleLight: {
    color: COLORS.grey.light,
  },
  textInputButtonTitleDark: {
    color: COLORS.text,
  },
  flexContainer: {
    flex: 1
  }
})
