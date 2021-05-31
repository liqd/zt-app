import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 128,
    borderColor: COLORS.grey.extralight,
    borderWidth: 1,
    padding: SPACINGS.multiplyBy(.8),
    marginVertical: SPACINGS.multiplyBy(.2)
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: SIZES.base,
    fontWeight: 'bold'
  },
  text: {
    fontSize: SIZES.sm,
  }
});
