import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.paper
  },
  containerInner: {
    flex: 1,
    alignItems: 'center'
  },
  avatarStyles: {
    width: 112,
    height: 112,
    marginTop: SPACINGS.multiplyBy(5),
    marginBottom: SPACINGS.multiplyBy(1)
  },
})
