import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './IdeaProject.styles';
import { IdeasList } from './IdeasList';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import API from '../../BaseApi';
import { COLORS } from '../../theme/colors';
import { DateService } from '../../services/DateService';

export const IdeaProject = (props) => {
  const project = props.navigation.getParam('project');
  const [ideas, setIdeas] = useState([]);
  const [activePhase, setActivePhase] = useState();
  const [phaseStart, setPhaseStart] = useState();
  const [phaseEnd, setPhaseEnd] = useState();
  const bgImage = project.image
    ? project.image
    : 'https://i.imgur.com/o4L0arH.jpg';
  const singleModule = project.single_agenda_setting_module;

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
    singleModule &&
      API.getIdeas(singleModule).then((ideaResponse) =>
        setIdeas(ideaResponse)
      ) &&
      API.getModule(singleModule).then((moduleResponse) => {
        const aPhase = moduleResponse.phases.find((phase) => phase.is_active);
        aPhase && setActivePhase(aPhase);
        aPhase && setPhaseStart(DateService(aPhase.start_date, 'month d, y, h:m'));
        aPhase && setPhaseEnd(DateService(aPhase.end_date, 'month d, y, h:m'));
      });
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
                {activePhase ? (
                  <View style={styles.phaseContainer}>
                    <Text style={styles.phaseText}>
                      {activePhase && activePhase.name + ' (active)'}
                    </Text>
                    <Text style={styles.phaseDate}>
                      {phaseStart} – {phaseEnd}
                    </Text>
                    <Text style={styles.phaseText}>
                      {activePhase && activePhase.description}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.phaseContainer}>
                    <Text>No active phase found.</Text>
                  </View>
                )}
              </View>
            </View>
            {singleModule ? (
              <View>
                <View style={styles.listActions}>
                  <Button icon={filterIcon} type='clear' />
                  <Button icon={sortIcon} type='clear' />
                </View>
                <View style={styles.listContainer}>
                  <IdeasList ideas={ideas} {...props} />
                </View>
                {activePhase && (
                  <Button
                    buttonStyle={styles.submitButton}
                    title='Submit Idea'
                    onPress={pressHandler}
                  />
                )}
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
