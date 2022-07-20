import { StyleSheet } from 'react-native'
import { COLORS } from '../theme/colors'
import { SPACINGS, BORDERRADIUS } from '../theme/spacings'

export const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    width: '90%',
    borderTopLeftRadius: BORDERRADIUS.md,
    borderTopRightRadius: BORDERRADIUS.md,
  },
  actionButton: {
    width: '90%',
    borderBottomLeftRadius: BORDERRADIUS.md,
    borderBottomRightRadius: BORDERRADIUS.md,
  },
  actionButtonText: {
    color: COLORS.danger
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingBottom: SPACINGS.multiplyBy(3),
  },
  cancelButtonText: {
    color: COLORS.paper.main
  }
})
