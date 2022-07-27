import { StyleSheet } from 'react-native'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatarStyles: {
    marginTop: 0,
    marginRight: SPACINGS.multiplyBy(1),
  }
})
