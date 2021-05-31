import React, { useState, useEffect } from 'react';
import { Button, View } from 'react-native';
import { styles } from './IdeasPage.styles';
import { IdeasList } from './IdeasList';

export const IdeasPage = (props) => {
  // Data fetching happens currently on highest level (App.js).
  // Depending on how we manage state (redux/context), this needs
  // to be shifted somewhere else.
  const [fetchedData, setFetchedData] = useState([]);

  const pressHandler = () => props.navigation.navigate('IdeaCreate', {params: props});

  useEffect(() => {
    fetch('https://aplus-dev.liqd.net/api/modules/335/ideas/')
      .then((response) => response.json())
      .then((unpackedData) => {
        setFetchedData(unpackedData);
      });
  }, []);

  return (
    <View style={styles.container}>
      <IdeasList ideas={fetchedData} {...props} />
      <Button style={styles.absoluteBottomBtn} title="Submit Idea" onPress={pressHandler} />
    </View>
  );
};
