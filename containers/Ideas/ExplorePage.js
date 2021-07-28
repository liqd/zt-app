import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import API from '../../BaseApi';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';
import { ExploreListItem } from './ExploreListItem';
import { Menu } from '../../components/Menu';

export const ExplorePage = (props) => {
  const [projects, setProjects] = useState([]);
  const menuItems  = [
    {
      title: 'Edit',
      icon: 'pencil',
      action: () => console.log('Edit')
    },
    {
      title: 'Delete',
      icon: 'trash',
      action: () => console.log('Delete')
    },
    {
      title: 'Report',
      icon: 'flag',
      action: () => console.log('Report')
    },
  ];

  const fetchProjects = () => {
    API.getProjects().then((response) => setProjects(response));
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
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Recently Added</Text>
      <FlatList
        keyExtractor={(i) => `pk${i.pk}`}
        data={projects.filter(p => p.single_agenda_setting_module)}
        renderItem={projectItem}
      />
      <Menu menuItems={menuItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACINGS.multiplyBy(0.8),
    backgroundColor: COLORS.paper.main,
  },
  title: {
    fontSize: SIZES.multiplyBy(1.75),
    fontWeight: 'bold',
    marginVertical: SPACINGS.multiplyBy(.5)
  },
  subtitle: {
    fontSize: SIZES.multiplyBy(1.25),
    fontWeight: '500',
    marginVertical: SPACINGS.multiplyBy(.25)
  }
});
