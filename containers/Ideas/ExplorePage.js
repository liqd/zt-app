import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import API from '../../BaseApi';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';
import { ExploreListItem } from './ExploreListItem';

export const ExplorePage = (props) => {
  const [projects, setProjects] = useState([]);

  // useEffect only runs on this page's first load
  // in order to re-fetch modules and ideas everytime when going back to this
  // screen, we need to use this navigation hook 'didFocus' and fetchProjects again.
  const focusListener = props.navigation.addListener('didFocus', () =>
    fetchProjects()
  );

  const fetchProjects = () => {
    focusListener.remove();
    API.getProjects().then((response) => setProjects(response));
  };

  const pressHandler = (project) =>
    props.navigation.navigate('IdeaProject', { project: project });

  const projectItem = ({ item }) => (
    <ExploreListItem item={item} action={(project) => pressHandler(project)} />
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Recently Added</Text>
      <FlatList
        keyExtractor={(i) => `pk${i.pk}`}
        data={projects}
        renderItem={projectItem}
      />
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
