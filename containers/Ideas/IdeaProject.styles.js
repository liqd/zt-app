import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT } from '../../theme/fonts';
import { SPACINGS, BORDERRADIUS } from '../../theme/spacings';

const headerOffset = 300;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    margin: SPACINGS.multiplyBy(-0.8),
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: COLORS.primary,
    paddingTop: SPACINGS.multiplyBy(1.5),
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width:'100%',
    height: 300,
    opacity: 0.5
  },
  overlayContainer: {
    borderTopLeftRadius: BORDERRADIUS.container,
    borderTopRightRadius: BORDERRADIUS.container,
    top: headerOffset,
    backgroundColor: COLORS.paper.main,
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
    fontSize: SIZES.multiplyBy(1.375),
    marginTop: SPACINGS.multiplyBy(1.5),
    marginBottom: SPACINGS.multiplyBy(0.5),
    fontWeight: FONTWEIGHT.bold,
  },
  description: {
    fontSize: SIZES.multiplyBy(0.9375),
    marginTop: SPACINGS.multiplyBy(0.5),
    marginBottom: SPACINGS.base,
  },
  organisationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACINGS.multiplyBy(1.5)
  },
  organisationName: {
    fontSize: SIZES.multiplyBy(0.9375),
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
    fontSize: SIZES.multiplyBy(1.0625),
    fontWeight: FONTWEIGHT.bold,
    color: COLORS.text.main
  },
  tabsMenuItemActive: {
    fontSize: SIZES.multiplyBy(1.0625),
    fontWeight: FONTWEIGHT.bold,
    color: COLORS.primary
  },
  phaseContainer: {
    marginVertical: SPACINGS.multiplyBy(1.5),
  },
  phaseDate: {
    fontSize: SIZES.multiplyBy(0.9375),
    fontWeight: FONTWEIGHT.boldxl,
  },
  phaseText: {
    fontSize: SIZES.multiplyBy(0.9375),
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
    color: COLORS.text.inverted,
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tabButton: {
    paddingHorizontal: 0
  }
});
