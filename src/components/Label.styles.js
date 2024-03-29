import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'
import { BORDERRADIUS,SPACINGS } from '../theme/spacings'

export const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.text,
    paddingVertical: SPACINGS.multiplyBy(.2),
    paddingHorizontal: SPACINGS.multiplyBy(.6),
    borderRadius: BORDERRADIUS.base,
    marginRight: SPACINGS.multiplyBy(.5),
  },
  text: {
    color: COLORS.paper,
    fontSize: SIZES.sm
  }
})
