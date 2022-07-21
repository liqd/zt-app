import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import API from '../../BaseApi'
import { ExploreListItem } from './ExploreListItem'
import { styles } from './ExplorePage.styles'
import { ButtonAvatar } from '../../components/ButtonAvatar'
import { TextSourceSans } from '../../components/TextSourceSans'

export const ExplorePage = (props) => {
  const [projects, setProjects] = useState([])

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
    const projectsListener = props.navigation.addListener('focus', () => {
      fetchProjects()
    })
    return projectsListener
  }, [])

  const toProfile = () => {
    props.navigation.navigate('ProfileScreen', {name: 'Bob'})
  }

  return (
    <View style={styles.container}>
      <ButtonAvatar
        labelText="profile"
        hintText="click to go to profile and settings"
        onPress={() => toProfile()}
      ></ButtonAvatar>
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
