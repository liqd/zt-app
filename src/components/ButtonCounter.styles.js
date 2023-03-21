import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, LETTERSPACING, LINEHEIGHTS, SIZES } from '../theme/fonts'
import { BORDERRADIUS, SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    paddingLeft: SPACINGS.multiplyBy(.5),
    paddingRight: SPACINGS.multiplyBy(.5),
    paddingTop: SPACINGS.multiplyBy(.25),
    paddingBottom: SPACINGS.multiplyBy(.25),
    marginBottom: SPACINGS.multiplyBy(.5),
    borderRadius: BORDERRADIUS.base,
  },
  text: {
    letterSpacing: LETTERSPACING.iconbtn,
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.sm,
    fontFamily: FONTS.familySemiBold
  },
  disableStyle: {
    fontSize: SIZES.sm,
    color: COLORS.grey.medium,
    fontFamily: FONTS.familySans
  },
  ratedUp: {
    color: COLORS.primary,
  },
  highlightUp: {
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  ratedDown: {
    color: COLORS.danger,
  },
  highlightDown: {
    color: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
})
