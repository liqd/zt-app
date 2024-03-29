import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTS,SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.grey.extralight,
    marginVertical: SPACINGS.multiplyBy(0.75),
  },
  title: {
    fontSize: SIZES.base,
    fontFamily: FONTS.familySemiBold,
    marginBottom: SPACINGS.multiplyBy(0.5),
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: COLORS.primary
  },
  textContainer: {
    padding: SPACINGS.multiplyBy(0.8),
    flex: 1
  },
  text: {
    marginBottom: SPACINGS.multiplyBy(0.5)
  },
  progressContainer: {
    padding: SPACINGS.multiplyBy(0.8),
  },
  progressText: {
    fontSize: SIZES.sm,
    color: COLORS.grey.medium
  },
  progressBar: {
    marginVertical: 10
  }
})
