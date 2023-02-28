import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTS,SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACINGS.multiplyBy(0.8),
  },
  title: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.familySemiBold,
    marginVertical: SPACINGS.multiplyBy(.5)
  },
  subtitle: {
    fontSize: SIZES.lg,
    fontFamily: FONTS.familySemiBold,
    marginVertical: SPACINGS.multiplyBy(.25)
  },
  flexContainer: {
    backgroundColor: COLORS.paper,
    flex: 1
  }
})
