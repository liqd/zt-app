import { StyleSheet } from 'react-native'
import { SIZES, FONTWEIGHT } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  phaseContainer: {
    marginVertical: SPACINGS.multiplyBy(1.5),
  },
  phaseDate: {
    fontSize: SIZES.multiplyBy(0.9375),
    fontWeight: FONTWEIGHT.boldxl,
  },
  phaseText: {
    fontSize: SIZES.multiplyBy(0.9375),
  }
})
