import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/colors'
import { SPACINGS, BORDERWIDTH } from '../../theme/spacings'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatarStyles: {
    marginTop: 0,
    marginRight: SPACINGS.multiplyBy(1),
  },
  textInputList: {
    backgroundColor: COLORS.paper,
    paddingHorizontal: SPACINGS.multiplyBy(0.75),
    borderBottomColor: COLORS.grey.extralight,
    borderBottomWidth: BORDERWIDTH.base,
  }
})
