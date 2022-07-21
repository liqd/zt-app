import { StyleSheet } from 'react-native'
import { COLORS } from '../theme/colors'
import { SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  collapsibleButton: {
    backgroundColor: COLORS.paper,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SPACINGS.multiplyBy(0.25),
    paddingVertical: SPACINGS.multiplyBy(0.25),
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  collapsibleIcon: {
    marginHorizontal: SPACINGS.multiplyBy(0.75)
  },
  collapsibleBody: {
    paddingTop: SPACINGS.multiplyBy(0.5),
    paddingBottom: SPACINGS.multiplyBy(1.25),
    marginBottom: SPACINGS.multiplyBy(0.5),
    borderBottomWidth: 1
  }
})
