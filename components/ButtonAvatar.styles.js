import { StyleSheet } from 'react-native'
import { SPACINGS } from '../theme/spacings'
import { COLORS } from '../theme/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.paper
  },
  imageCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginTop: SPACINGS.base,
    backgroundColor: COLORS.primary,
  },
})
