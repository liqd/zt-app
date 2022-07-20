import { StyleSheet } from 'react-native'
import { COLORS } from '../theme/colors'
import { BORDERRADIUS } from '../theme/spacings'
import { SPACINGS } from '../theme/spacings'
import { SIZES, LINEHEIGHTS } from '../theme/fonts'

export const styles = StyleSheet.create({
  labelTitle: {
    color: COLORS.text.main
  },
  labelTitleChecked: {
    color: COLORS.paper.main
  },
  labelButton: {
    backgroundColor: COLORS.paper.main,
    width: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderRadius: BORDERRADIUS.lg
  },
  labelButtonChecked: {
    color: COLORS.paper.main,
    backgroundColor: COLORS.primary,
    width: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderRadius: BORDERRADIUS.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  formLabel: {
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    width: '100%'
  },

})
