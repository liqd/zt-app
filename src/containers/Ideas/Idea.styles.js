import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTS, LINEHEIGHTS, SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  fontColor: {
    color: COLORS.text,
  },
  container: {
    paddingHorizontal: SPACINGS.multiplyBy(.75),
    backgroundColor: COLORS.paper,
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
    fontFamily: FONTS.familySemiBold
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
  pressableEditing: {
    opacity: 0.25,
    backgroundColor: '#fff'
  },
  flexFullWidth: {
    flex: 1
  },
  safeAreaView: {
    backgroundColor: COLORS.paper,
    flex: 1
  },

})
