import { Dimensions,StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'
import { BORDERRADIUS } from '../theme/spacings'

const SCREEN_HEIGHT = Dimensions.get('window').height
const submitButtonHeight =  SCREEN_HEIGHT * 0.085

export const styles = StyleSheet.create({
  submitButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: submitButtonHeight,
    fontSize: SIZES.base,
    borderRadius: BORDERRADIUS.none,
  }
})
