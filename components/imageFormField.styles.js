import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACINGS, BORDERWIDTH } from '../theme/spacings';
import { SIZES, LINEHEIGHTS } from '../theme/fonts';

export const styles = StyleSheet.create({
  formImagePicker: {
    alignItems: 'center'
  },
  formImagePreview: {
    width: '100%',
    height: 50,
    marginBottom: SPACINGS.multiplyBy(.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.grey.extralight,
    borderWidth: BORDERWIDTH.base
  },
  formImage: {
    width: '30%',
    height: '30%'
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
  textDark: {
    color: COLORS.text.main,
  }
});
