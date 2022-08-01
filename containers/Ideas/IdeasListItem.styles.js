import { StyleSheet } from 'react-native'

import { COLORS } from '../../theme/colors'
import { FONTWEIGHT,SIZES } from '../../theme/fonts'
import { BORDERWIDTH,SPACINGS } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderColor: COLORS.grey.extralight,
    borderWidth: BORDERWIDTH.base,
    padding: SPACINGS.multiplyBy(.8),
    marginVertical: SPACINGS.multiplyBy(.2)
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: SIZES.base,
    fontWeight: FONTWEIGHT.bold
  },
  text: {
    fontSize: SIZES.sm,
    marginRight: SPACINGS.multiplyBy(0.5),
  },
  date: {
    fontSize: SIZES.sm,
  },
  counters: {
    flexDirection: 'row',
    marginLeft: SPACINGS.multiplyBy(.75),
    width: 120
  },
  labelsContainer: {
    flexDirection: 'row',
    marginTop: SPACINGS.multiplyBy(.55),
    flexWrap: 'wrap',
  },
  labelWrapper: {
    marginBottom: SPACINGS.multiplyBy(.45)
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexBasis: '70%'
  },
  noLabelSpacing: {
    height: SPACINGS.multiplyBy(2.2)
  }
})
