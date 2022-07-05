import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';
import { SPACINGS, BORDERRADIUS } from '../theme/spacings';

export const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.text.main,
    paddingVertical: SPACINGS.multiplyBy(.2),
    paddingHorizontal: SPACINGS.multiplyBy(.6),
    borderRadius: BORDERRADIUS.base,
    marginRight: SPACINGS.multiplyBy(.5),
  },
  text: {
    color: COLORS.text.inverted,
    fontSize: SIZES.multiplyBy(.9375)
  }
});
