import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { LINEHEIGHTS,SIZES } from '../theme/fonts'
import { BORDERRADIUS,BORDERWIDTH, SPACINGS } from '../theme/spacings'

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
    flex: 2,
    justifyContent: 'flex-end'
  },
  iconRemoveButton: {
    fontSize: SIZES.lg,
    backgroundColor: COLORS.paper,
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
    color: COLORS.text,
  },
  imageButtonIcon: {
    marginHorizontal: SPACINGS.multiplyBy(0.25),
    fontSize: SIZES.md
  },
  imageButton: {
    minWidth: '100%',
    color: COLORS.paper,
    backgroundColor: COLORS.text,
    paddingVertical: SPACINGS.multiplyBy(0.75),
    borderColor: COLORS.text,
    borderRadius: BORDERRADIUS.none
  },
  imageInfo: {
    marginBottom: SPACINGS.multiplyBy(1)
  },
  textLight: {
    color: COLORS.paper
  },
  avatarStyles: {
    marginRight: SPACINGS.multiplyBy(1),
  },
})
