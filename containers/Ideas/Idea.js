import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Idea.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ButtonCounter } from '../../components/buttonCounter';

export const Idea = (props) => {
  const params = props.navigation.getParam('params');
  console.log(params);
  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <Button
          title='Back'
          type='clear'
          icon={<Icon name="arrow-left" size={15} />}
          onPress={() => props.navigation.goBack()}
        />
        <Button
          icon={<Icon name="options-vertical" size={15} />}
          type="clear"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{params.name}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Image
          source={{uri: params.image}}
          style={styles.ideaImage}
        />
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
          <ButtonCounter
            icon={<Icon name="arrow-up" />}
            counter='0' />
          <ButtonCounter
            icon={<Icon name="arrow-down" />}
            counter='0' />
        </View>
        <View>
          <Text>
            <Icon name="bubble" size={15} />
          </Text>
        </View>
      </View>
      <View>
        <Text>Comment section</Text>
      </View>
    </View>
  );
};
