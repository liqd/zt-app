import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTWEIGHT, LINEHEIGHTS,SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paper,
    flex: 1,
  },
  header: {
    paddingTop: SPACINGS.multiplyBy(0.25)
  },
  title: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.base,
    fontWeight: FONTWEIGHT.bold,
    paddingHorizontal: SPACINGS.multiplyBy(0.75),
  }
})
