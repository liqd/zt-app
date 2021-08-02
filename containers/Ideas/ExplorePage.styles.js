import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACINGS.multiplyBy(0.8),
    backgroundColor: COLORS.paper.main,
  },
  title: {
    fontSize: SIZES.multiplyBy(1.75),
    fontWeight: FONTWEIGHT.bold,
    marginVertical: SPACINGS.multiplyBy(.5)
  },
  subtitle: {
    fontSize: SIZES.multiplyBy(1.25),
    fontWeight: FONTWEIGHT.semiBold,
    marginVertical: SPACINGS.multiplyBy(.25)
  },
  logoutContainer: {
    height: SPACINGS.multiplyBy(2),
    marginTop: SPACINGS.multiplyBy(.75),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
