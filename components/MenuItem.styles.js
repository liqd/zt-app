import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { BORDERRADIUS } from '../theme/spacings';

export const styles = StyleSheet.create({
  listButton: {
    width: '90%',
    borderTopLeftRadius: BORDERRADIUS.none,
    borderTopRightRadius: BORDERRADIUS.none,
  },
  listButtonFirst: {
    width: '90%',
    borderTopLeftRadius: BORDERRADIUS.base,
    borderTopRightRadius: BORDERRADIUS.base,
  },
  listButtonLast: {
    width: '90%',
    borderBottomLeftRadius: BORDERRADIUS.base,
    borderBottomRightRadius: BORDERRADIUS.base,
  },
  cancelContent: {
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent'
  },
  cancelButtonText: {
    color: COLORS.paper.main
  }
});
