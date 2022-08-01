import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.paper
  },
  imageCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
})
