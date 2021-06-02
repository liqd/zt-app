import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './IdeaProject.styles';
import { IdeasList } from './IdeasList';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import API from '../../BaseApi';
import { COLORS } from '../../theme/colors';

export const IdeaProject = (props) => {
  const project = props.navigation.getParam('project');
  const [ideas, setIdeas] = useState([]);
  const bgImage = project.image
    ? project.image
    : 'https://i.imgur.com/o4L0arH.jpg';
  const validModule =
    project.published_modules.length === 1
      ? project.published_modules[0]
      : undefined;

  const pressHandler = () =>
    props.navigation.navigate('IdeaCreate', { params: props });

  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper.main} />;
  const sortIcon = <IconFA name='filter' size={20} color={COLORS.grey.light} />;
  const filterIcon = (
    <IconFA name='search' size={20} color={COLORS.grey.light} />
  );
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} color={COLORS.paper.main} />
  );

  useEffect(() => {
    validModule &&
      API.getIdeas(validModule).then((response) => setIdeas(response));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground style={styles.bgImage} source={{ uri: bgImage }}>
          <View style={styles.actionsContainer}>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              title='Back'
              type='clear'
              icon={arrowLeftIcon}
              onPress={() => props.navigation.goBack()}
            />
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              title='Follow'
              icon={plusIcon}
              type='clear'
            />
          </View>
          <View style={styles.overlayContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{project.name}</Text>
              <Text style={styles.description}>{project.description}</Text>
              <Text style={styles.organisation}>By {project.organisation}</Text>
              <View>
                <View style={styles.tabsMenu}>
                  <Text style={styles.tabsMenuItemActive}>Participation</Text>
                  <Text style={styles.tabsMenuItem}>Information</Text>
                  <Text style={styles.tabsMenuItem}>Results</Text>
                </View>
                <View style={styles.phaseContainer}>
                  <Text>Collect phase active</Text>
                  <Text>May 20, 2021, 8 a.m. – May 31, 2021, 11:59 p.m.</Text>
                  <Text>Create and comment on new ideas.</Text>
                </View>
              </View>
            </View>
            {validModule ? (
              <View>
                <View style={styles.listActions}>
                  <Button icon={filterIcon} type='clear' />
                  <Button icon={sortIcon} type='clear' />
                </View>
                <View style={styles.listContainer}>
                  <IdeasList ideas={ideas} {...props} />
                </View>
                <Button
                  buttonStyle={styles.submitButton}
                  title='Submit Idea'
                  onPress={pressHandler}
                />
              </View>
            ) : (
              <Text>
                Oops. Multiple module projects are not supported in adhocracy+
                app, yet! Please find them on adhocracy+ web.
              </Text>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
