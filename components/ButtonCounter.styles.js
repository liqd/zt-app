import { StyleSheet } from 'react-native';
import { SPACINGS } from '../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    letterSpacing: SPACINGS.multiplyBy(.5),
    fontSize: 15,
    lineHeight: 20,
  },
  text: {
    letterSpacing: 5,
  }
});
