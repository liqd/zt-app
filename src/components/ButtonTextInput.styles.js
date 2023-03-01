import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, LINEHEIGHTS,SIZES } from '../theme/fonts'
import { BORDERRADIUS, BORDERWIDTH,SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  textInputButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: FONTS.familySemiBold,
    width: '100%',
    borderRadius: BORDERRADIUS.none,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
    color: COLORS.grey.light
  },
  textInputButtonTitleBase: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.base,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
})
