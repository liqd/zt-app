import { Dimensions,Platform, StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTS, SIZES } from '../../theme/fonts'
import { BORDERRADIUS,SPACINGS } from '../../theme/spacings'

const headerOffset = 300
const SCREEN_HEIGHT = Dimensions.get('window').height
const submitButtonOffset =  SCREEN_HEIGHT * 0.085

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer:
    Platform.OS == 'ios'
      ? { marginBottom: submitButtonOffset / 1.9 }
      : { marginBottom: submitButtonOffset },
  containerInner: {
    marginLeft: SPACINGS.multiplyBy(-0.8),
    marginRight: SPACINGS.multiplyBy(-0.8),
  },
  bgImage: {
    width: '100%',
    height: 445,
    position: 'absolute',
    backgroundColor: COLORS.primary,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width:'100%',
    height: 175,
    opacity: 0.75
  },
  overlayContainer: {
    borderTopLeftRadius: BORDERRADIUS.container,
    borderTopRightRadius: BORDERRADIUS.container,
    top: headerOffset,
    backgroundColor: COLORS.paper,
    paddingBottom: headerOffset,
  },
  infoContainer: {
    padding: SPACINGS.multiplyBy(0.8),
  },
  listContainer: {
    padding: SPACINGS.multiplyBy(0.8),
    flex: 1,
  },
  title: {
    fontSize: SIZES.xl,
    marginTop: SPACINGS.multiplyBy(1.5),
    marginBottom: SPACINGS.multiplyBy(0.5),
    fontFamily: FONTS.familySemiBold,
  },
  description: {
    fontSize: SIZES.sm,
    marginTop: SPACINGS.multiplyBy(0.5),
    marginBottom: SPACINGS.base,
  },
  organisationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACINGS.multiplyBy(1.5)
  },
  organisationName: {
    fontSize: SIZES.sm,
    flex: 1
  },
  organisationLogoContainer: {
    width: 40,
    height: 40,
    marginRight: SPACINGS.multiplyBy(0.75),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grey.light,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.6,
        shadowRadius: 10
      },
      android: {
        elevation: 5
      }
    })
  },
  organisationLogo: {
    width: 30,
    height: 30,
    resizeMode: 'cover'
  },
  tabsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabsMenuItem: {
    fontSize: SIZES.md,
    fontFamily: FONTS.familySemiBold,
    color: COLORS.text
  },
  tabsMenuItemActive: {
    color: COLORS.primary
  },
  actionsContainer: {
    height: SPACINGS.multiplyBy(4),
    marginTop: SPACINGS.multiplyBy(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: SIZES.md,
    marginHorizontal: SPACINGS.multiplyBy(.4),
    color: COLORS.paper,
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tabButton: {
    paddingHorizontal: 0
  },
  contactHeadline: {
    borderTopWidth: 1,
    marginTop: SPACINGS.multiplyBy(1),
    paddingTop: SPACINGS.multiplyBy(1),
    fontSize: SIZES.md,
    fontFamily: FONTS.familySemiBold,
  },
  contactField: {
    paddingTop: SPACINGS.multiplyBy(0.7),
  },
  contactLabel: {
    fontFamily: FONTS.familySemiBold,
  }
})
