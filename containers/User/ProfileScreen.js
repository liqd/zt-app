import React from 'react'
import {View} from 'react-native'

import { ButtonSignOut } from '../../components/ButtonSignOut'

import {TextSourceSans} from '../../components/TextSourceSans'

export const ProfileScreen = () => {
  return (
    <View>
      <TextSourceSans>
          profile
      </TextSourceSans>
      <ButtonSignOut></ButtonSignOut>
    </View>
  )
}
