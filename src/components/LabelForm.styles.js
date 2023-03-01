import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS } from '../theme/fonts'
import { BORDERRADIUS, BORDERWIDTH } from '../theme/spacings'

export const styles = StyleSheet.create({
  labelTitle: {
    color: COLORS.text,
    fontFamily: FONTS.familySans
  },
  labelTitleChecked: {
    color: COLORS.paper,
    fontFamily: FONTS.familySans
  },
  labelButton: {
    backgroundColor: COLORS.paper,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderColor: COLORS.grey.extralight,
    borderWidth: BORDERWIDTH.base,
    borderRadius: BORDERRADIUS.lg
  },
  labelButtonChecked: {
    color: COLORS.paper,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderRadius: BORDERRADIUS.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})
