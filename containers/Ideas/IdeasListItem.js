import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './IdeasListItem.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ButtonCounter } from '../../components/ButtonCounter';
import { DateService } from '../../services/DateService';

export const IdeasListItem = (props) => {
  const {
    name,
    created,
    creator,
    comment_count: commentCount,
    positive_rating_count: upCount,
    negative_rating_count: downCount,
  } = props.idea;

  const createdDate = new DateService(created).get();
  const pressHandler = () =>
    props.navigation.navigate('IdeaDetail', {
      params: props.idea,
      createdDate: createdDate,
    });

  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>
            {creator}, {createdDate}
          </Text>
          <View style={styles.counters}>
            <ButtonCounter icon={<Icon name='arrow-up' />} counter={upCount} />
            <ButtonCounter icon={<Icon name='arrow-down' />} counter={downCount} />
            <ButtonCounter icon={<Icon name='bubble' />} counter={commentCount} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
