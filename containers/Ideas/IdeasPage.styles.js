import { StyleSheet } from 'react-native';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: SPACINGS.multiplyBy(.8),
    paddingBottom: 70
  },
  absoluteBottomBtn: {
    // alignSelf: 'flex-end',
    // position: 'absolute',
    // bottom: 35
  }
});
