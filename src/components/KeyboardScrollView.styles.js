import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'

export const styles = StyleSheet.create({
  flexContainerKeyboard: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.paper,
  },
  flexContainerScroll: {
    flex: 1,
  }
})
