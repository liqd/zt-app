import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './IdeasPage.styles';
import { IdeasList } from './IdeasList';
import API from '../../BaseApi'

export const IdeasPage = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const moduleId = 335

  useEffect(() => {
      API.getIdeas(moduleId).then(response => setFetchedData(response))
  }, []);

  return (
    <View style={styles.container}>
      <IdeasList ideas={fetchedData} {...props} />
    </View>
  );
};
