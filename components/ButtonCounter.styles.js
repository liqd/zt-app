import { StyleSheet } from 'react-native';
import { SPACINGS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS, LETTERSPACING } from '../theme/fonts';

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
  }
});
