import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { BORDERRADIUS } from '../theme/spacings';

export const styles = StyleSheet.create({
  collapsibleButton: {
    backgroundColor: COLORS.text.inverted,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.lg
  }
});
