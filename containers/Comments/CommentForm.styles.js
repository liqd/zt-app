import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { BORDERRADIUS,SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  submitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACINGS.multiplyBy(1),
    paddingTop: SPACINGS.multiplyBy(0.75),
    paddingBottom: SPACINGS.multiplyBy(2)
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    backgroundColor: COLORS.paper,
    borderRadius: BORDERRADIUS.lg,
    padding: SPACINGS.multiplyBy(0.5),
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0
  },
  submitButton: {
    padding: SPACINGS.multiplyBy(0.25),
    paddingRight: SPACINGS.multiplyBy(0.4),
    marginLeft: SPACINGS.multiplyBy(0.5),
    backgroundColor: COLORS.primary,
    borderRadius: BORDERRADIUS.lg
  }
})
