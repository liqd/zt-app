import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { styles } from './ExploreListItem.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { TextSourceSans } from '../../components/TextSourceSans';

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
          <TextSourceSans style={styles.text}>
            by {props.item.organisation}
          </TextSourceSans>
          <TextSourceSans style={styles.title}>
            {props.item.name}
          </TextSourceSans>
          <TextSourceSans style={styles.text}>
            {props.item.description}
          </TextSourceSans>
        </View>
        <View style={styles.progressContainer}>
          <TextSourceSans style={styles.progressText}>
            <IconSLI
              name='clock'
              color={COLORS.grey.medium}
            /> nur noch 12 Wochen
          </TextSourceSans>
        </View>
      </View>
    </TouchableOpacity>
  );
};
