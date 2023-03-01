import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS, SIZES } from '../theme/fonts'
import { BORDERWIDTH,SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
    height: SPACINGS.multiplyBy(2),
    fontSize: SIZES.md
  },
  textInputFull: {
    fontSize: SIZES.md,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    textAlignVertical: 'top',
  },
  textInputFullContainer: {
    paddingHorizontal: SPACINGS.multiplyBy(0.75)
  },
  checkBoxContainer: {
    backgroundColor: COLORS.paper,
    borderWidth: 0,
  },
  checkBoxText: {
    fontSize: SIZES.xs,
    fontFamily: FONTS.familySans
  },
  checkBoxWrapper: {
    alignItems: 'flex-start',
    borderRadius: 0
  },
  dropdownContainer: {
    zIndex: 1,
  },
  dropdownFormField: {
    borderBottomColor: COLORS.grey.extralight,
    backgroundColor: COLORS.paper,
    paddingLeft: 0,
    paddingBottom: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 0,
    borderBottomWidth: BORDERWIDTH.base,
  },
  dropdownFormFieldText: {
    color: COLORS.text,
    fontSize: SIZES.base,
  },
  formRow: {
    paddingVertical: SPACINGS.multiplyBy(.5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
