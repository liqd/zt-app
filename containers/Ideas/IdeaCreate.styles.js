import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT,LINEHEIGHTS } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACINGS.multiplyBy(0.75),
    backgroundColor: COLORS.paper.main
  },
  header: {
    paddingTop: SPACINGS.multiplyBy(0.25)
  },
  title: {
    fontSize: SIZES.multiplyBy(1.375),
    lineHeight: SPACINGS.multiplyBy(2),
    fontWeight: FONTWEIGHT.bold
  },
  textInputButtonTitle: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInputButtonTitleLight: {
    color: COLORS.grey.medium,
  },
  textInputButtonTitleDark: {
    color: COLORS.text.main,
  },
});
