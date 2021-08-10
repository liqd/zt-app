import { StyleSheet } from 'react-native';
import { SPACINGS } from '../theme/spacings';

export const styles = StyleSheet.create({
  logoutContainer: {
    height: SPACINGS.multiplyBy(2),
    marginTop: SPACINGS.multiplyBy(.75),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
