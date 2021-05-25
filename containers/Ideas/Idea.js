import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './Idea.styles';

import { ButtonCounter } from '../../components/buttonCounter';

export const Idea = (props) => {
  const params = props.navigation.getParam('params');
  console.log(params);
  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <Text style={styles.text}>
          <Button title='Back' onPress={() => props.navigation.goBack()} /> and
          three dots menu
        </Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{params.name}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{params.description}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          {params.author || 'author n/a'} {params.date || 'date n/a'}
        </Text>
        <Text style={styles.text}>{params.referenceNo || 'reference n/a'}</Text>
      </View>
      <View style={styles.bottomActionsContainer}>
        <View style={styles.ratingButtons}>
          <ButtonCounter icon='🔼' counter='0' />
          <ButtonCounter icon='🔽' counter='0' />
        </View>
        <View>
          <Text>💬</Text>
        </View>
      </View>
      <View>
        <Text>Comment section</Text>
      </View>
    </View>
  );
};
