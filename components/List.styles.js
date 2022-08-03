import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, SIZES } from '../theme/fonts'
import { BORDERRADIUS, BORDERWIDTH,SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  listTitle: {
    fontFamily: FONTS.familySemiBold,
    paddingLeft: SPACINGS.multiplyBy(0.75),
    paddingVertical: SPACINGS.multiplyBy(0.75),
    fontSize: SIZES.md,
    borderRadius: BORDERRADIUS.none,
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
  },
  listItem: {
    color: COLORS.text,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.paper,
    padding: SPACINGS.multiplyBy(0.75),
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
  },
  listLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textInputButtonTitleBase: {
    fontSize: SIZES.md,
  },
})
