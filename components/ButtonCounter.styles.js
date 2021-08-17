import { StyleSheet } from 'react-native';
import { SPACINGS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS, LETTERSPACING, FONTWEIGHT } from '../theme/fonts';
import { COLORS } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: SPACINGS.multiplyBy(.4),
  },
  icon: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
    color: COLORS.text.main
  },
  text: {
    letterSpacing: LETTERSPACING.iconbtn,
    color: COLORS.text.main
  },
  iconDisabled: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
    color: COLORS.grey.light
  },
  textDisabled: {
    letterSpacing: LETTERSPACING.iconbtn,
    color: COLORS.grey.light
  },
  textHighlight: {
    letterSpacing: LETTERSPACING.iconbtn,
    color: COLORS.primary,
    fontWeight: FONTWEIGHT.boldxxl
  },
  iconHighlight: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
    color: COLORS.primary,
    fontWeight: FONTWEIGHT.boldxxl
  }
});
