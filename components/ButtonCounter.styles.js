import { StyleSheet } from 'react-native';
import { SPACINGS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS, LETTERSPACING } from '../theme/fonts';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
  },
  text: {
    letterSpacing: LETTERSPACING.iconbtn,
  },
  iconDisabled: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    color: COLORS.grey.light
  },
  textDisabled: {
    letterSpacing: LETTERSPACING.iconbtn,
    color: COLORS.grey.light
  },
});
