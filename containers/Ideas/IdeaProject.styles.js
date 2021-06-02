import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';

const headerOffset = 250;
const submitButtonHeight = 70;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlayContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    top: headerOffset,
    backgroundColor: 'white',
    paddingBottom: headerOffset
  },
  infoContainer: {
    padding: SPACINGS.multiplyBy(0.8),
  },
  listContainer: {
    padding: SPACINGS.multiplyBy(0.8),
    flex: 1,
  },
  submitButtonContainer: {
    height: submitButtonHeight
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: submitButtonHeight,
    fontSize: SIZES.base,
    borderRadius: 0,
  },
  title: {
    fontSize: SIZES.multiplyBy(1.375),
    marginTop: SPACINGS.multiplyBy(1.5),
    marginBottom: SPACINGS.multiplyBy(0.5),
    fontWeight: 'bold',
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
    fontWeight: '600'
  },
  tabsMenuItemActive: {
    fontSize: SIZES.multiplyBy(1.0625),
    fontWeight: '600',
    color: COLORS.primary
  },
  phaseContainer: {
    marginVertical: SPACINGS.multiplyBy(1.5)
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
