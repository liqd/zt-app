import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  fontColor: {
    color: COLORS.text.main,
  },
  container: {
    paddingHorizontal: SPACINGS.multiplyBy(.75),
    backgroundColor: COLORS.paper.main,
  },
  descripContainer: {
    paddingHorizontal: SPACINGS.multiplyBy(.75),
    backgroundColor: COLORS.paper.main,
    flex: 1,
  },
  descripBtnContainer: {
    marginHorizontal: SPACINGS.multiplyBy(-.75),
    flex: 1,
    justifyContent: 'flex-end'
  },
  actionsContainer: {
    marginTop: SPACINGS.multiplyBy(2),
    marginBottom: SPACINGS.multiplyBy(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: SIZES.multiplyBy(1.375),
    lineHeight: SPACINGS.multiplyBy(2),
    fontWeight: FONTWEIGHT.bold
  },
  text: {
    fontSize: SIZES.sm,
  },
  creator: {
    textTransform: 'capitalize',
    fontSize: SIZES.sm,
    lineHeight: SPACINGS.multiplyBy(1.5),
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
  textLight: {
    color: COLORS.text.inverted,
  },
  commentIcon: {
    fontSize: SIZES.md,
    marginVertical: SPACINGS.multiplyBy(.5),
  },
  pressableEditing: {
    opacity: 0.25,
    backgroundColor: '#fff'
  }
});
