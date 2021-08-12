import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  container: {
    marginVertical: SPACINGS.multiplyBy(0.5),
    borderTopWidth: 1,
    borderColor: COLORS.grey.light
  },
  subContainer: {
    marginLeft: SPACINGS.multiplyBy(1.5),
    paddingLeft: SPACINGS.multiplyBy(1.5),
    borderLeftWidth: 1,
    borderColor: COLORS.grey.light
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: SPACINGS.base,
    backgroundColor: COLORS.primary,
  },
  top: {
    flexDirection: 'row',
    marginVertical: SPACINGS.base,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  topLeft: {
    flexDirection: 'row',
  },
  date: {
    color: COLORS.grey.medium,
    fontSize: SIZES.xs
  },
  username: {
    textTransform: 'capitalize',
    fontWeight: FONTWEIGHT.boldxl
  },
  linkSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACINGS.base
  },
  linkButton: {
    color: COLORS.grey.medium
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACINGS.multiplyBy(0.5)
  },
  ratingButtons: {
    width: 120,
    flexDirection: 'row',
  },
  buttonTitle: {
    color: COLORS.grey.dark,
    marginLeft: SPACINGS.multiplyBy(0.4)
  },
  commentButton: {
    paddingVertical: SPACINGS.multiplyBy(.4)
  }
});
