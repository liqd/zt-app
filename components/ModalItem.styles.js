import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { BORDERRADIUS } from '../theme/spacings';

export const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    width: '90%',
    borderTopLeftRadius: BORDERRADIUS.base,
    borderTopRightRadius: BORDERRADIUS.base,
  },
  actionButton: {
    width: '90%',
    borderBottomLeftRadius: BORDERRADIUS.base,
    borderBottomRightRadius: BORDERRADIUS.base,
  },
  actionButtonText: {
    color: COLORS.danger
  },
  cancelButton: {
    backgroundColor: 'transparent'
  },
  cancelButtonText: {
    color: COLORS.paper.main
  }
});
