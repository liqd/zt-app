import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'
import { SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paper,
  },
  actionsContainer: {
    paddingBottom: SPACINGS.multiplyBy(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    marginVertical: 0,
  },
  backButtonText: {
    fontSize: SIZES.md,
    marginHorizontal: SPACINGS.multiplyBy(.25),
    color: COLORS.text,
  }
})
