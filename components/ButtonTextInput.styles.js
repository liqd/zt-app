import { StyleSheet } from 'react-native'
import { COLORS } from '../theme/colors'
import { SIZES, LINEHEIGHTS, FONTWEIGHT } from '../theme/fonts'
import { SPACINGS, BORDERRADIUS, BORDERWIDTH } from '../theme/spacings'

export const styles = StyleSheet.create({
  textInputButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: FONTWEIGHT.semiBold,
    width: '100%',
    borderRadius: BORDERRADIUS.none,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
    color: COLORS.grey.light
  },
  formLabel: {
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    width: '100%'
  },
})
