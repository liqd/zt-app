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
    borderTopLeftRadius: BORDERRADIUS.md,
    borderTopRightRadius: BORDERRADIUS.md,
  },
  listButtonLast: {
    width: '90%',
    borderBottomLeftRadius: BORDERRADIUS.md,
    borderBottomRightRadius: BORDERRADIUS.md,
  },
  listButtonOnly: {
    width: '90%',
    borderTopLeftRadius: BORDERRADIUS.md,
    borderTopRightRadius: BORDERRADIUS.md,
    borderBottomLeftRadius: BORDERRADIUS.md,
    borderBottomRightRadius: BORDERRADIUS.md,
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
