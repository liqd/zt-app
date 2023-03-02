import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, SIZES } from '../theme/fonts'
import { SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  collapsibleButton: {
    backgroundColor: COLORS.paper,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SPACINGS.multiplyBy(0.25),
    paddingVertical: SPACINGS.multiplyBy(0.25),
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  collapsibleButtonTitle: {
    flexGrow: 2,
    flexBasis: '90%',
    fontSize: SIZES.md,
    fontFamily: FONTS.familySemiBold,
  },
  collapsibleIcon: {
    flexGrow: 1
  },
  collapsibleBody: {
    paddingTop: SPACINGS.multiplyBy(0.5),
    paddingBottom: SPACINGS.multiplyBy(1.25),
    marginBottom: SPACINGS.multiplyBy(0.5),
    borderBottomWidth: 1
  }
})
