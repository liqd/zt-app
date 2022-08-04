import { StyleSheet } from 'react-native'

import { FONTWEIGHT,SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACINGS.multiplyBy(.75),
  },
  title: {
    marginTop: SPACINGS.multiplyBy(4),
    marginBottom: SPACINGS.multiplyBy(0.75),
    fontSize: SIZES.xxl,
    fontWeight: FONTWEIGHT.bold
  },
  registerText: {
    fontSize: SIZES.base,
    marginBottom: SPACINGS.multiplyBy(1.5)
  },
  forgotPassword: {
    fontSize: SIZES.base,
    marginTop: SPACINGS.multiplyBy(3)
  },
})
