import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'

import API from '../../BaseApi'
import { styles } from './ProfileScreen.styles'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'
import { AvatarCircle } from '../../components/ButtonAvatar'

export const ProfileScreen = (props) => {
  const {userId} = props.route.params
  const [user, setUser] = useState()

  const fetchUser = () => {
    return AsyncStorage.getItem('authToken')
      .then((token) => API.getUser(userId, token))
      .then((response) => {
        if(response.statusCode === 200) {
          setUser(response.data)
        } else {
          return Promise.reject(new Error('fetchUser returned ' + response.statusCode))
        }
      }).catch(error => console.warn(error))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.containerInner}>
        <AvatarCircle
          imgSource={user && {uri: user._avatar}}
          avatarSize={styles.avatarSize}
        />
        <TextSourceSans>
          {user && user.username}
        </TextSourceSans>
      </View>
      <ButtonSignOut></ButtonSignOut>
    </View>
  )
}
