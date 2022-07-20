import { StyleSheet } from 'react-native'
import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'
import { BORDERRADIUS } from '../theme/spacings'

const submitButtonHeight = 70

export const styles = StyleSheet.create({
  submitButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: submitButtonHeight,
    fontSize: SIZES.base,
    borderRadius: BORDERRADIUS.none,
  },
})
