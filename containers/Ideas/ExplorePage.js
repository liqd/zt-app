import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import API from '../../BaseApi';
import { ExploreListItem } from './ExploreListItem';
import { styles } from './ExplorePage.styles';
import { ButtonSignOut } from '../../components/ButtonSignOut';

export const ExplorePage = (props) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    API.getProjects()
      .then(response => response && setProjects(response))
      .catch(error => console.warn(error));
  };

  const pressHandler = (project) =>
    props.navigation.navigate('IdeaProject', { project: project });

  const projectItem = ({ item }) => (
    <ExploreListItem item={item} action={(project) => pressHandler(project)} />
  );

  useEffect(() => {
    const projectsListener = props.navigation.addListener('focus', () => {
      fetchProjects();
    });
    return projectsListener;
  }, []);

  return (
    <View style={styles.container}>
      <ButtonSignOut></ButtonSignOut>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Recently Added</Text>
      <FlatList
        keyExtractor={(i) => `pk${i.pk}`}
        data={projects.filter(p => p.single_agenda_setting_module)}
        renderItem={projectItem}
      />
    </View>
  );
};
