import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './IdeasListItem.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ButtonCounter } from '../../components/ButtonCounter';
import { DateService } from '../../services/DateService';
import { Label } from '../../components/Label';

export const IdeasListItem = (props) => {
  const {
    name,
    created,
    creator,
    category,
    comment_count: commentCount,
    positive_rating_count: upCount,
    negative_rating_count: downCount,
  } = props.idea;

  const createdDate = DateService(created);
  const pressHandler = () =>
    props.navigation.navigate('IdeaDetail', {
      idea: props.idea,
      project: props.route.params.project,
      createdDate: createdDate,
    });

  const getCategory = () => {
    let categoryList = [];
    category && categoryList.push(category.name);
    return categoryList;
  };

  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{name}</Text>
          {getCategory().length > 0 && (
            <View style={styles.labelsContainer}>
              {getCategory().map((category, idx) => (
                <Label key={idx + category} title={category} />
              ))}
            </View>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>{creator}</Text>
          <Text style={styles.text}>
            {createdDate}
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
