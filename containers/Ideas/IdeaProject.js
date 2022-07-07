import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Image } from 'react-native';
import { Button } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './IdeaProject.styles';
import { IdeasList } from './IdeasList';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import API, { baseUrl } from '../../BaseApi';
import { COLORS } from '../../theme/colors';
import { DateService } from '../../services/DateService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextSourceSans } from '../../components/TextSourceSans';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function ParticipationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextSourceSans>Participation testing this </TextSourceSans>
    </View>
  );
}

function InformationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextSourceSans>Information</TextSourceSans>
    </View>
  );
}

function ResultsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextSourceSans>Results</TextSourceSans>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Participation" component={ParticipationScreen} style={styles.tabsMenuItem} />
      <Tab.Screen name="Information" component={InformationScreen} style={styles.tabsMenuItem} />
      <Tab.Screen name="Results" component={ResultsScreen} style={styles.tabsMenuItem} />
    </Tab.Navigator>
  );
}

export const IdeaProject = (props) => {
  const {project} = props.route.params;
  const [ideas, setIdeas] = useState([]);
  const [module, setModule] = useState([]);
  const [activePhase, setActivePhase] = useState();
  const bgImage = project.image
    ? project.image
    : null;

  const pressHandler = () =>
    props.navigation.navigate('IdeaCreate', {
      module: module
    });

  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper.main} />;
  const sortIcon = <IconFA name='filter' size={20} color={COLORS.grey.light} />;
  const filterIcon = (
    <IconFA name='search' size={20} color={COLORS.grey.light} />
  );
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} color={COLORS.paper.main} />
  );

  const fetchIdeas = () => {
    project.single_agenda_setting_module &&
      AsyncStorage.getItem('authToken')
        .then((token) => API.getIdeas(project.single_agenda_setting_module, token))
        .then((ideaResponse) => {
          setIdeas(ideaResponse);
        });
  };

  const fetchModule = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.getModule(project.single_agenda_setting_module, token))
      .then((moduleResponse) => {
        setModule(moduleResponse);
        const activePhase = moduleResponse.phases.find((phase) => phase.is_active);
        activePhase && setActivePhase(activePhase);
      });
  };

  useEffect(() => {
    const ideasListener = props.navigation.addListener('focus', () => {
      fetchIdeas();
    });
    return ideasListener;
  }, [ideas]);

  useEffect(() => {
    fetchModule();
  }, []);

  const getDateTimeDisplay = (dateTime) => {
    return DateService(dateTime, 'month d, y, h:m');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground style={styles.bgImage} source={{ uri: bgImage }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.80)', 'rgba(0,0,0,0.00)']}
            style={styles.linearGradient}
          />
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
              <TextSourceSans style={styles.title}>
                {project.name}
              </TextSourceSans>
              <TextSourceSans style={styles.description}>
                {project.description}
              </TextSourceSans>
              <View style={styles.organisationContainer}>
                {project.organisation_logo && (
                  <View style={styles.organisationLogoContainer}>
                    <Image
                      style={styles.organisationLogo}
                      source={{ uri: baseUrl + project.organisation_logo }}
                    />
                  </View>)}
                <TextSourceSans style={styles.organisationName}>
                  {project.organisation}
                </TextSourceSans>
              </View>
              <NavigationContainer independent={true}>
                <MyTabs />
              </NavigationContainer>
            </View>
            {project.single_agenda_setting_module ? (
              <View>
                <View style={styles.listActions}>
                  <Button icon={filterIcon} type='clear' />
                  <Button icon={sortIcon} type='clear' />
                </View>
                <View style={styles.listContainer}>
                  <IdeasList
                    ideas={ideas}
                    module={module}
                    navigation={props.navigation}
                  />
                </View>
                {module.has_idea_adding_permission && (
                  <ButtonSubmit
                    title='Submit Idea'
                    onPress={pressHandler}
                  >
                  </ButtonSubmit>
                )}
              </View>
            ) : (
              <TextSourceSans>
                Oops. Multiple module projects are not supported in adhocracy+
                app, yet! Please find them on adhocracy+ web.
              </TextSourceSans>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
