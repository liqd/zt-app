import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './IdeasListItem.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ButtonCounter } from '../../components/ButtonCounter';
import { DateService } from '../../services/DateService';

export const IdeasListItem = (props) => {
  const createdDate = new DateService(props.created).get();
  const pressHandler = () =>
    props.navigation.navigate('IdeaDetail', {
      params: props,
      createdDate: createdDate,
    });
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{props.name}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.text}>
              {props.creator}, {createdDate}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              <ButtonCounter
                icon={<Icon name="arrow-up" />}
                counter='0' />
              <ButtonCounter
                icon={<Icon name="arrow-down" />}
                counter='0' />
              <ButtonCounter
                icon={<Icon name="bubble" />}
                counter='0' />
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
