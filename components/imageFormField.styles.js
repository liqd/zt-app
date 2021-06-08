import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACINGS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS } from '../theme/fonts';

export const styles = StyleSheet.create({
  formImagePicker: {
    alignItems: 'center'
  },
  formImagePreview: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  formImage: {
    width: '30%',
    height: '30%'
  },
  imageButton: {
    width: '100%',
    backgroundColor: COLORS.text.main,
    color: COLORS.text.inverted
  },
  // These should be refactored to go in common file
  formRow: {
    paddingVertical: SPACINGS.multiplyBy(.5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formLabel: {
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    width: '100%'
  },
  iconButton: {
    marginHorizontal: SPACINGS.multiplyBy(.25),
    fontSize: SIZES.md
  },
  textLight: {
    color: COLORS.text.inverted,
  },
  textDark: {
    color: COLORS.text.main,
  }
});
