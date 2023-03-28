import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, LINEHEIGHTS, SIZES } from '../theme/fonts'
import { BORDERRADIUS, SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACINGS.multiplyBy(.5),
    paddingVertical: SPACINGS.multiplyBy(.4),
    borderRadius: BORDERRADIUS.base,
  },
  baseText: {
    marginRight: 5,
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.sm,
    fontFamily: FONTS.familySemiBold
  },
  disableText: {
    color: COLORS.grey.medium,
    fontFamily: FONTS.familySans,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: SIZES.sm,
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
