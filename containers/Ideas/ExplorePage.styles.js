import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/colors'
import { SIZES, FONTWEIGHT } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACINGS.multiplyBy(0.8),
    paddingTop: SPACINGS.multiplyBy(1.25),
    backgroundColor: COLORS.paper,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: FONTWEIGHT.bold,
    marginVertical: SPACINGS.multiplyBy(.5)
  },
  subtitle: {
    fontSize: SIZES.lg,
    fontWeight: FONTWEIGHT.semiBold,
    marginVertical: SPACINGS.multiplyBy(.25)
  }
})
