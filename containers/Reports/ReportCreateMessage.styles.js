import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT, LINEHEIGHTS } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paper.main,
  },
  containerInner: {
    paddingHorizontal: SPACINGS.multiplyBy(0.75),
  },
  actionsContainer: {
    height: SPACINGS.multiplyBy(4),
    marginTop: SPACINGS.multiplyBy(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 0,
    marginVertical: 0,
  },
  backButtonText: {
    fontSize: SIZES.md,
    marginHorizontal: SPACINGS.multiplyBy(.25),
    color: COLORS.text.main,
  },
  title: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.base,
    fontWeight: FONTWEIGHT.bold,
    paddingHorizontal: SPACINGS.multiplyBy(0.75),
  },
});
