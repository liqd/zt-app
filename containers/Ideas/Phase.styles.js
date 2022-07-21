import { StyleSheet } from 'react-native'
import { FONTS, SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  phaseContainer: {
    marginVertical: SPACINGS.multiplyBy(1.5),
  },
  phaseDate: {
    fontSize: SIZES.sm,
    fontFamily: FONTS.familySemiBold,
  },
  phaseText: {
    fontSize: SIZES.sm,
  }
})
