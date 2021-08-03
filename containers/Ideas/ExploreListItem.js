import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { styles } from './ExploreListItem.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

export const ExploreListItem = (props) => {
  const image = props.item.image
    ? props.item.image
    : null;

  return (
    <TouchableOpacity onPress={() => props.action(props.item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            by {props.item.organisation}
          </Text>
          <Text style={styles.title}>
            {props.item.name}
          </Text>
          <Text style={styles.text}>
            {props.item.description}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            <IconSLI
              name='clock'
              color={COLORS.grey.medium}
            /> nur noch 12 Wochen
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
