import React, { useState, useEffect } from 'react';
import { Button, View } from 'react-native';
import { styles } from './IdeasPage.styles';
import { IdeasList } from './IdeasList';
import API from '../../BaseApi';

export const IdeasPage = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const moduleId = 335;

  const pressHandler = () => props.navigation.navigate('IdeaCreate', {params: props});

  useEffect(() => {
    API.getIdeas(moduleId).then(response => setFetchedData(response));
  }, []);

  return (
    <View style={styles.container}>
      <IdeasList ideas={fetchedData} {...props} />
      <Button style={styles.absoluteBottomBtn} title="Submit Idea" onPress={pressHandler} />
    </View>
  );
};
