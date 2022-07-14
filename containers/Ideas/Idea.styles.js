import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT, LINEHEIGHTS } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  fontColor: {
    color: COLORS.text.main,
  },
  container: {
    paddingHorizontal: SPACINGS.multiplyBy(.75),
    backgroundColor: COLORS.paper.main,
  },
  actionsContainer: {
    height: SPACINGS.multiplyBy(4),
    marginTop: SPACINGS.multiplyBy(1.5),
    marginHorizontal: SPACINGS.multiplyBy(-0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButton: {
    padding: 0,
    marginVertical: 0,
    marginHorizontal: -5,
  },
  backButtonText: {
    fontSize: SIZES.md,
    marginHorizontal: SPACINGS.multiplyBy(.25),
    color: COLORS.text.main,
  },
  titleContainer: {
    marginTop: SPACINGS.multiplyBy(.25)
  },
  descriptionContainer: {
    marginVertical: SPACINGS.multiplyBy(.25)
  },
  infoContainer: {
    marginVertical: SPACINGS.multiplyBy(.75)
  },
  title: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.base,
    fontWeight: FONTWEIGHT.bold
  },
  text: {
    fontSize: SIZES.sm,
  },
  creator: {
    textTransform: 'capitalize',
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACINGS.multiplyBy(1.25),
  },
  ratingButtons: {
    width: 120,
    flexDirection: 'row',
  },
  ideaImage: {
    marginRight: 5,
    width: '100%',
    height: 270,
    resizeMode: 'cover',
    marginVertical: SPACINGS.base,
  },
  disabledIcon: {
    color: COLORS.grey.light
  },
  labelsContainer: {
    flexDirection: 'row',
    marginVertical: SPACINGS.multiplyBy(.5),
    flexWrap: 'wrap',
  },
  commentIcon: {
    fontSize: SIZES.md,
    marginVertical: SPACINGS.multiplyBy(.5),
  },
  pressableEditing: {
    opacity: 0.25,
    backgroundColor: '#fff'
  },
  flexFullWidth: {
    flex: 1
  },
  textInputButtonTitle: {
    fontSize: SIZES.md,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInputButtonTitleLight: {
    color: COLORS.grey.medium,
  },
  textInputButtonTitleDark: {
    color: COLORS.text.main,
  },
});
