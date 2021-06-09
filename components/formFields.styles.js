import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACINGS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS } from '../theme/fonts';

export const styles = StyleSheet.create({
  formTitle: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
    fontWeight: 'bold'
  },
  formLabel: {
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.base,
    paddingBottom: SPACINGS.multiplyBy(.25),
    width: '100%'
  },
  textInput: {
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: 1,
    height: SPACINGS.multiplyBy(2),
    fontSize: SIZES.md,
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  checkBoxContainer: {
    width: '30%',
    backgroundColor: COLORS.text.inverted,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.grey.extralight,
    marginBottom: SPACINGS.base
  },
  checkBoxFormFieldContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dropdownFormField: {
    borderBottomColor: COLORS.grey.extralight,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
  },
  formError: {
    fontSize: SIZES.xs,
    color: 'red'
  },
  formRow: {
    paddingVertical: SPACINGS.multiplyBy(.5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
