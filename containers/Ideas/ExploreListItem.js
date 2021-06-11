import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';
import { SPACINGS } from '../../theme/spacings';
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

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.grey.extralight,
    height: 424,
    marginVertical: SPACINGS.multiplyBy(0.75),
  },
  title: {
    fontSize: SIZES.base,
    fontWeight: '600',
    marginBottom: SPACINGS.multiplyBy(0.5),
  },
  imageContainer: {
    height: '50%'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: COLORS.primary
  },
  textContainer: {
    padding: SPACINGS.multiplyBy(0.8),
    flex: 1
  },
  text: {
    marginBottom: SPACINGS.multiplyBy(0.5),
  },
  progressContainer: {
    padding: SPACINGS.multiplyBy(0.8),
  },
  progressText: {
    color: COLORS.grey.medium
  }
});
