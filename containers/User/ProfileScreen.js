import React, { useEffect,useState } from 'react'
import { View } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@rneui/base'

import API from '../../BaseApi'
import { AvatarCircle } from '../../components/ButtonAvatar'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './ProfileScreen.styles'

export const ProfileScreen = (props) => {
  const toSettingsOverview = () => {
    props.navigation.navigate('SettingsOverview', {
      userId: userId,
      userName: user.username,
      userImage: user._avatar})
  }

  const {userName, userImage} = props.route.params

  const settingsIcon = <IconSLI name='settings' size={30} />
  const rightHeaderButton = (
    <Button
      icon={settingsIcon}
      type='clear'
      onPress={toSettingsOverview}
    />)
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
      })
      .catch(error => console.warn(error))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        rightButton={user && user.is_self && rightHeaderButton}
      />
      <View style={styles.containerInner}>
        <AvatarCircle
          imgSource={userImage ? {uri: userImage} :user && {uri: user._avatar}}
          avatarStyles={styles.avatarStyles}
        />
        <TextSourceSans>
          {userName ? userName : user && user.username}
        </TextSourceSans>
      </View>
      {user && user.is_self &&
        <ButtonSignOut />
      }
    </View>
  )
}
