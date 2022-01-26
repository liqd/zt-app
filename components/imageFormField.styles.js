import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACINGS, BORDERWIDTH, BORDERRADIUS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS } from '../theme/fonts';

export const styles = StyleSheet.create({
  formImagePicker: {
    width: '50%'
  },
  formImagePickerFull: {
    width: '100%',
  },
  imageAddButton: {
    marginHorizontal: 'auto',
    marginVertical: SPACINGS.multiplyBy(.5),
    fontSize: SIZES.md,
    height: 100,
    textAlign: 'center',
    borderColor: COLORS.grey.extralight,
    borderTopWidth: BORDERWIDTH.base,
    borderRightWidth: BORDERWIDTH.base,
    borderLeftWidth: BORDERWIDTH.base,
    borderBottomWidth: BORDERWIDTH.base,
    borderRadius: BORDERRADIUS.none,
    display: 'flex',
    flexWrap: 'wrap'
  },
  iconButton: {
    paddingLeft: SPACINGS.multiplyBy(3.75),
    paddingBottom: SPACINGS.multiplyBy(0.5),
    paddingTop: SPACINGS.multiplyBy(1),
    fontSize: SIZES.md,
    width: '100%',
  },
  formImagePreview: {
    width: '100%',
    height: 150
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
  textDark: {
    color: COLORS.text.main,
  },
  imageButtonIcon: {
    marginHorizontal: SPACINGS.multiplyBy(0.25),
    fontSize: SIZES.md
  },
  imageButton: {
    minWidth: '100%',
    color: COLORS.text.inverted,
    backgroundColor: COLORS.text.main,
    paddingVertical: SPACINGS.multiplyBy(0.75),
    borderColor: COLORS.text.main,
    borderRadius: BORDERRADIUS.none
  },
  imageInfo: {
    marginBottom: SPACINGS.multiplyBy(1)
  },
  textLight: {
    color: COLORS.text.inverted
  }
});
