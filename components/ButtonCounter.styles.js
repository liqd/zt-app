import { StyleSheet } from 'react-native';
import { SPACINGS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS, LETTERSPACING, FONTWEIGHT } from '../theme/fonts';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
  },
  text: {
    letterSpacing: LETTERSPACING.iconbtn,
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
  },
  disableStyle: {
    color: COLORS.grey.light
  },
  highlightUpStyle: {
    color: COLORS.primary,
    fontWeight: FONTWEIGHT.boldxxl
  },
  highlightDownStyle: {
    color: COLORS.danger,
    fontWeight: FONTWEIGHT.boldxxl
  },
});
