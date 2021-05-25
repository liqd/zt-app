import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './IdeasListItem.styles';

import { ButtonCounter } from '../../components/buttonCounter';

export const IdeasListItem = (props) => {
  const pressHandler = () => props.navigation.navigate('IdeaDetail', {params: props});
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <Text style={styles.text}>
            <ButtonCounter icon='🔼' counter='0' />
            <ButtonCounter icon='🔽' counter='0' />
            <ButtonCounter icon='💬' counter='0' />
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{props.author || 'Author'}, {props.date || '2021-05-21'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
