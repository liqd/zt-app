import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/colors'
import { SIZES, FONTWEIGHT } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACINGS.multiplyBy(0.8),
    paddingTop: SPACINGS.multiplyBy(1.25),
    backgroundColor: COLORS.paper.main,
  },
  title: {
    fontSize: SIZES.multiplyBy(1.75),
    fontWeight: FONTWEIGHT.bold,
    marginVertical: SPACINGS.multiplyBy(.5)
  },
  subtitle: {
    fontSize: SIZES.multiplyBy(1.25),
    fontWeight: FONTWEIGHT.semiBold,
    marginVertical: SPACINGS.multiplyBy(.25)
  }
})
