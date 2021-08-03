import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.grey.extralight,
    height: 424,
    marginVertical: SPACINGS.multiplyBy(0.75),
  },
  title: {
    fontSize: SIZES.base,
    fontWeight: FONTWEIGHT.bold,
    marginBottom: SPACINGS.multiplyBy(0.5),
  },
  imageContainer: {
    height: '50%'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: COLORS.primary
  },
  textContainer: {
    padding: SPACINGS.multiplyBy(0.8),
    flex: 1
  },
  text: {
    marginBottom: SPACINGS.multiplyBy(0.5),
  },
  progressContainer: {
    padding: SPACINGS.multiplyBy(0.8),
  },
  progressText: {
    color: COLORS.grey.medium
  }
});
