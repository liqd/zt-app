import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import API from '../../BaseApi'
import { ExploreListItem } from './ExploreListItem'
import { styles } from './ExplorePage.styles'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { TextSourceSans } from '../../components/TextSourceSans'
import { useAuthorization } from '../Auth/AuthProvider.js'

export const ExplorePage = (props) => {
  const [projects, setProjects] = useState([])
  const { deepLink, setDeepLink } = useAuthorization()

  const fetchProjects = () => {
    API.getProjects()
      .then(response => response && setProjects(response))
      .catch(error => console.warn(error))
  }

  const pressHandler = (project) =>
    props.navigation.navigate('IdeaProject', { project: project })

  const projectItem = ({ item }) => (
    <ExploreListItem item={item} action={(project) => pressHandler(project)} />
  )

  useEffect(() => {
    if (deepLink !== undefined && deepLink !== null ){
      const project = deepLink
      setDeepLink(null)
      props.navigation.navigate('IdeaProject', { project: project })
    } else {
      const projectsListener = props.navigation.addListener('focus', () => {
        fetchProjects()
      })
      return projectsListener
    }
  }, [])

  return (
    <View style={styles.container}>
      <ButtonSignOut></ButtonSignOut>
      <TextSourceSans style={styles.title}>Explore</TextSourceSans>
      <TextSourceSans style={styles.subtitle}>Recently Added</TextSourceSans>
      <FlatList
        keyExtractor={(i) => `pk${i.pk}`}
        data={projects.filter(p => p.single_idea_collection_module)}
        renderItem={projectItem}
      />
    </View>
  )
}
