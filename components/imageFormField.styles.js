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
    height: 100,
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: SIZES.md,
    paddingTop: SPACINGS.multiplyBy(1.25),
    marginVertical: SPACINGS.multiplyBy(.5),
    borderColor: COLORS.grey.extralight,
    borderWidth: BORDERWIDTH.base,
    borderRadius: BORDERRADIUS.none,
  },
  imageAddButtonLeft: {
    marginRight: -0.5,
  },
  imageAddButtonRight: {
    marginLeft: -0.5,
  },
  iconButton: {
    width: '100%',
    textAlign: 'center',
    fontSize: SIZES.md,
  },
  imageRemoveButton: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  iconRemoveButton: {
    fontSize: SIZES.lg,
    backgroundColor: COLORS.text.inverted,
    borderRadius: BORDERRADIUS.container,
  },
  formImagePreview: {
    width: '100%',
    height: 150,
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
