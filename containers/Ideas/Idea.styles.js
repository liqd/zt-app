import { StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES} from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

export const styles = StyleSheet.create({
  fontColor: {
    color: COLORS.text.main,
  },
  container: {
    paddingBottom: SPACINGS.multiplyBy(2),
    paddingTop: SPACINGS.base,
    paddingHorizontal: SPACINGS.multiplyBy(.75),
    backgroundColor: COLORS.paper.main,
  },
  scrollContainer: {
    paddingBottom: SPACINGS.multiplyBy(2),
    paddingTop: SPACINGS.base,
    paddingHorizontal: SPACINGS.multiplyBy(.75),
    backgroundColor: COLORS.paper.main,
    height: '80%'
  },
  contentContainer: {
    paddingVertical: SPACINGS.base
  },
  actionsContainer: {
    height: SPACINGS.multiplyBy(2),
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
    fontSize: SIZES.multiplyBy(1.375),
    lineHeight: SPACINGS.multiplyBy(2),
    fontWeight: 'bold'
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
  imageButton: {
    width: '100%',
    backgroundColor: COLORS.text.main,
    color: COLORS.text.inverted,
    marginBottom: SPACINGS.multiplyBy(.5)
  },
  textLight: {
    color: COLORS.text.inverted,
  },
  iconButton: {
    marginHorizontal: SPACINGS.multiplyBy(.25),
    fontSize: SIZES.md
  },
});
