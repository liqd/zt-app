import { StyleSheet } from 'react-native'
import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'
import { BORDERRADIUS } from '../theme/spacings'

const buttonHeight = 70

export const styles = StyleSheet.create({
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: buttonHeight,
    backgroundColor: COLORS.text,
    width: '100%',
    fontSize: SIZES.base,
    borderRadius: BORDERRADIUS.none,
  },
})
