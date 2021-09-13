import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES, FONTWEIGHT } from '../../theme/fonts';
import { SPACINGS, BORDERRADIUS } from '../../theme/spacings';

const headerOffset = 250;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: COLORS.primary
  },
  overlayContainer: {
    borderTopLeftRadius: BORDERRADIUS.container,
    borderTopRightRadius: BORDERRADIUS.container,
    top: headerOffset,
    backgroundColor: COLORS.paper.main,
    paddingBottom: headerOffset
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
  organisation: {
    fontSize: SIZES.multiplyBy(0.9375),
    marginBottom: SPACINGS.multiplyBy(2),
  },
  tabsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabsMenuItem: {
    fontSize: SIZES.multiplyBy(1.0625),
    fontWeight: FONTWEIGHT.bold
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
    height: SPACINGS.multiplyBy(2),
    marginTop: SPACINGS.multiplyBy(.75),
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
    paddingHorizontal: SPACINGS.multiplyBy(0.8),
  }
});
