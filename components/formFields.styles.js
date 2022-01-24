import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACINGS, BORDERWIDTH, BORDERRADIUS } from '../theme/spacings';
import { SIZES, LINEHEIGHTS, FONTWEIGHT } from '../theme/fonts';

export const styles = StyleSheet.create({
  formTitle: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.md,
    fontWeight: FONTWEIGHT.bold
  },
  formLabel: {
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    width: '100%'
  },
  textInput: {
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
    height: SPACINGS.multiplyBy(2),
    fontSize: SIZES.md,
  },
  customCheckBoxTitle: {
    color: COLORS.text.main
  },
  customCheckBoxTitleChecked: {
    color: COLORS.text.inverted
  },
  checkBoxContainer: {
    backgroundColor: COLORS.text.inverted,
  },
  customCheckBoxButton: {
    backgroundColor: COLORS.text.inverted,
    width: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderRadius: BORDERRADIUS.lg
  },
  customCheckBoxButtonChecked: {
    color: COLORS.text.inverted,
    backgroundColor: COLORS.primary,
    width: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0,
    borderRadius: BORDERRADIUS.lg,
  },
  customCheckBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dropdownFormField: {
    borderBottomColor: COLORS.grey.extralight,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 0,
    borderBottomWidth: BORDERWIDTH.base,
  },
  formError: {
    fontSize: SIZES.xs,
    color: COLORS.warning
  },
  formRow: {
    paddingVertical: SPACINGS.multiplyBy(.5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
