import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Idea.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ButtonCounter } from '../../components/ButtonCounter';
import { Label } from '../../components/Label';

export const Idea = (props) => {
  const params = props.navigation.getParam('params');
  const createdDate = props.navigation.getParam('createdDate');

  const getLabels = () => {
    let labelsList = [];
    params.category && labelsList.push(params.category);
    params.labels.length > 0 && labelsList.push(...params.labels);
    return labelsList;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.actionsContainer}>
        <Button
          buttonStyle={styles.backButton}
          titleStyle={styles.backButtonText}
          title='Back'
          type='clear'
          icon={<Icon name='arrow-left' size={22} />}
          onPress={() => props.navigation.goBack()}
        />
        <Button
          icon={<Icon name='options-vertical' size={22} />}
          type='clear'
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{params.name}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        {params.image && (
          <Image source={{ uri: params.image }} style={styles.ideaImage} />
        )}
        <Text style={styles.text}>{params.description}</Text>
      </View>
      {getLabels().length > 0 && (
        <View style={styles.labelsContainer}>
          {getLabels().map((label, idx) => (
            <Label key={idx + label} title={label} />
          ))}
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.creator}>
          {params.creator} {createdDate}
        </Text>
        <Text style={styles.text}>
          Reference No.: {params.reference_number || 'n/a'}
        </Text>
      </View>
      <View style={styles.bottomActionsContainer}>
        <View style={styles.ratingButtons}>
          <ButtonCounter
            icon={<Icon name='arrow-up' size={18} />}
            counter={params.positive_rating_count}
          />
          <ButtonCounter
            icon={<Icon name='arrow-down' size={18} />}
            counter={params.negative_rating_count}
          />
        </View>
        <View>
          <Text>
            <Icon name='bubble' size={18} color={styles.disabledIcon.color} />
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
