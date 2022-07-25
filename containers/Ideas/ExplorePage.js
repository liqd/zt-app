import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import API from '../../BaseApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ExploreListItem } from './ExploreListItem'
import { styles } from './ExplorePage.styles'
import { ButtonAvatar } from '../../components/ButtonAvatar'
import { TextSourceSans } from '../../components/TextSourceSans'
import {useAuthorization} from '../../containers/Auth/AuthProvider.js'

export const ExplorePage = (props) => {
  const [user, setUser] = useState()
  const [projects, setProjects] = useState([])
  const {signOut} = useAuthorization()

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

  const pressHandler = (project) =>
    props.navigation.navigate('IdeaProject', { project: project })

  const projectItem = ({ item }) => (
    <ExploreListItem item={item} action={(project) => pressHandler(project)} />
  )

  useEffect(() => {
    const projectsListener = props.navigation.addListener('focus', () => {
      fetchProjects()
    })
    return projectsListener
  }, [])

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  const toProfile = () => {
    props.navigation.navigate('ProfileScreen', {userId: user.pk})
  }

  return (
    <View style={styles.container}>
      {user &&
        <ButtonAvatar
          imgSource={{ uri: user._avatar }}
          labelText="profile"
          hintText="click to go to profile and settings"
          onPress={toProfile}
        />
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
  )
}
