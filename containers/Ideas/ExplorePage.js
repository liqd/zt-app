import React, { useCallback, useEffect, useState } from 'react'
import { FlatList,View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

import API from '../../BaseApi'
import { ButtonAvatar } from '../../components/ButtonAvatar'
import { TextSourceSans } from '../../components/TextSourceSans'
import {useAuthorization} from '../../containers/Auth/AuthProvider.js'
import { Header } from '../../components/Header'

import { ExploreListItem } from './ExploreListItem'
import { styles } from './ExplorePage.styles'

export const ExplorePage = (props) => {
  const [user, setUser] = useState()
  const [projects, setProjects] = useState([])
  const {signOut} = useAuthorization()
  const { deepLink, setDeepLink } = useAuthorization()

  const fetchProjects = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.getProjects(token))
      .then((response) => {
        if(response.statusCode === 200) {
          setProjects(response.data)
        } else if (response.statusCode === 401) {
          console.warn('Unauthorized, wrong login?')
          signOut()
        } else {
          return Promise.reject(new Error('fetchProjects returned ' + response.statusCode))
        }
      }).catch(error => console.warn(error))
  }

  const fetchAuthenticatedUser = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.getAuthenticatedUser(token))
      .then((response) => {
        if(response.statusCode === 200) {
          setUser(response.data)
        } else {
          return Promise.reject(new Error('fetchAuthenticatedUser returned ' + response.statusCode))
        }
      })
      .catch(error => console.warn(error))
  }

  const fetchProject = () => {
    return AsyncStorage.getItem('authToken').then((token) =>
      API.getProject(token, deepLink))
      .then((result) => {
        if (result.statusCode === 200) {
          return result.data
        }
        return null
      })
  }

  const pressHandler = (project) =>
    props.navigation.navigate('IdeaProject', { project: project })

  const projectItem = ({ item }) => (
    <ExploreListItem item={item} action={(project) => pressHandler(project)} />
  )

  useFocusEffect(
    useCallback(() => {
      if (deepLink !== null){
        fetchProject().then((project) => {
          setDeepLink(null)
          if(project === null){
            // TODO show toast/alert
            console.log('deep link project not found')
          } else{
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'ExplorePage' },
                  { name: 'IdeaProject',
                    params: { project: project },
                  },
                ],
              })
            )
          }
        })
      } else {
        fetchProjects()
      }
    }, [])
  )

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  const toProfile = () => {
    props.navigation.navigate('ProfileScreen', {userId: user.pk})
  }

  const rightHeaderButton = (
    <ButtonAvatar
      imgSource={ user && { uri: user._avatar }}
      labelText="profile"
      hintText="click to go to profile and settings"
      onPress={toProfile}
    />
  )

  const leftHeaderButton = (
    <View/>
  )

  return (
    <SafeAreaView
      style={styles.flexContainer}
    >
      <View style={styles.container}>
        {user &&
          <Header
            leftButton={leftHeaderButton}
            rightButton={rightHeaderButton}
            navigation={props.navigation} />
        }
        <TextSourceSans style={styles.title}>Explore</TextSourceSans>
        <TextSourceSans style={styles.subtitle}>Recently Added</TextSourceSans>
        {projects.length > 0 &&
          <FlatList
            keyExtractor={(i) => `pk${i.pk}`}
            data={projects.filter(p => p.single_idea_collection_module)}
            renderItem={projectItem}
          />
        }
      </View>
    </SafeAreaView>
  )
}
