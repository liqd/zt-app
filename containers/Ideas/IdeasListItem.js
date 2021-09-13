import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './IdeasListItem.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ButtonCounter } from '../../components/ButtonCounter';
import { DateService } from '../../services/DateService';
import { Label } from '../../components/Label';
import { TextSourceSans } from '../../components/TextSourceSans';

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
          <TextSourceSans style={styles.title}>{name}</TextSourceSans>
          {getCategory().length > 0 && (
            <View style={styles.labelsContainer}>
              {getCategory().map((category, idx) => (
                <Label key={idx + category} title={category} />
              ))}
            </View>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <TextSourceSans style={styles.text}>{creator}</TextSourceSans>
          <View style={styles.infoContainer}>
            <TextSourceSans style={styles.text}>
              {createdDate}
            </TextSourceSans>
            <View style={styles.counters}>
              <ButtonCounter icon={<Icon name='arrow-up' />} counter={upCount} />
              <ButtonCounter icon={<Icon name='arrow-down' />} counter={downCount} />
              <ButtonCounter icon={<Icon name='bubble' />} counter={commentCount} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
