import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Linking, ScrollView, Image, Alert } from 'react-native'
import { Button } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './IdeaProject.styles'
import { IdeasList } from './IdeasList'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import API from '../../BaseApi'
import { Phase } from './Phase'
import { COLORS } from '../../theme/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { LinkTextSourceSans } from '../../components/LinkTextSourceSans'
import { TextSourceSans } from '../../components/TextSourceSans'
import { Richtext } from '../../components/Richtext'
import { Header } from '../../components/Header'

export const IdeaProject = (props) => {
  const tabs = {
    participation: 0,
    information: 1,
    results: 2
  }
  const { project } = props.route.params
  const [ideas, setIdeas] = useState([])
  const [module, setModule] = useState([])
  const [visibleTab, setVisibleTab] = useState(tabs.participation)
  const bgImage = project.image ? project.image : null

  const pressHandler = () =>
    props.navigation.navigate('IdeaCreate', {
      module: module
    })

  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper.main} />
  const sortIcon = <IconFA name='filter' size={20} color={COLORS.grey.light} />
  const filterIcon = (
    <IconFA name='search' size={20} color={COLORS.grey.light} />
  )

  const followButton = (
    <Button
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}
      title='Follow'
      icon={plusIcon}
      type='clear'
    />
  )

  const fetchIdeas = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.getIdeas(project.single_idea_collection_module, token))
      .then((ideaResponse) => {
        setIdeas(ideaResponse)
      })
  }

  const fetchModule = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.getModule(project.single_idea_collection_module, token))
      .then((moduleResponse) => {
        // workaround in case of wrong credentials being used
        if ('pk' in moduleResponse) {
          setModule(moduleResponse)
        } else {
          Alert.alert('Fetching module failed: wrong login data?')
        }
      })
  }

  useEffect(() => {
    const ideasListener = props.navigation.addListener('focus', () => {
      fetchIdeas()
    })
    return ideasListener
  }, [ideas])

  useEffect(() => {
    fetchModule()
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={{ uri: bgImage }}
        accessibilityIgnoresInvertColors={true}
      />
      <ScrollView>
        <LinearGradient
          colors={['rgba(0,0,0,0.80)', 'rgba(0,0,0,0.00)']}
          style={styles.linearGradient}
        />
        <Header
          transparent={true}
          arrowColor={COLORS.paper.main}
          backButtonStyle={styles.button}
          backButtonTextStyle={styles.buttonText}
          rightButton={followButton}
          navigation={props.navigation} />
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
                    source={{ uri: project.organisation_logo }}
                    accessibilityIgnoresInvertColors={true}
                  />
                </View>)}
              <TextSourceSans style={styles.organisationName}>
                {project.organisation}
              </TextSourceSans>
            </View>
            <View style={styles.tabsMenu}>
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={visibleTab === tabs.participation ?
                  styles.tabsMenuItemActive : styles.tabsMenuItem
                }
                title='Participation'
                type='clear'
                onPress={() => setVisibleTab(tabs.participation)}
              />
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={visibleTab === tabs.information ?
                  styles.tabsMenuItemActive : styles.tabsMenuItem
                }
                title='Information'
                type='clear'
                onPress={() => setVisibleTab(tabs.information)}
              />
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={visibleTab === tabs.results ?
                  styles.tabsMenuItemActive : styles.tabsMenuItem
                }
                title='Results'
                type='clear'
                onPress={() => setVisibleTab(tabs.results)}
              />
            </View>
            {visibleTab === tabs.participation &&
              <View>
                <Phase
                  activePhase={module.active_phase}
                  futurePhases={module.future_phases}
                  pastPhases={module.past_phases}
                />
                {project.single_idea_collection_module ? (
                  <View style={styles.containerInner}>
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
            }
            {visibleTab === tabs.information &&
              <View>
                <Richtext text={project.information} />
                {project.has_contact_info &&
                <>
                  <TextSourceSans style={styles.contactHeadline}>
                    Contact for Questions
                  </TextSourceSans>
                  {!!project.contact_name &&
                    <TextSourceSans style={styles.contactField}>
                      {project.contact_name}
                    </TextSourceSans>
                  }
                  {!!project.contact_address_text &&
                    <TextSourceSans style={styles.contactField}>
                      {project.contact_address_text}
                    </TextSourceSans>
                  }
                  {!!project.contact_phone &&
                    <TextSourceSans style={styles.contactField}>
                      <TextSourceSans style={styles.contactLabel}>
                        Telephone: </TextSourceSans>
                      {project.contact_phone}
                    </TextSourceSans>
                  }
                  {!!project.contact_email &&
                    <TextSourceSans style={styles.contactField}>
                      <TextSourceSans style={styles.contactLabel}>
                        Email: </TextSourceSans>
                      <LinkTextSourceSans
                        onPress={() => Linking.openURL(`mailto:${project.contact_email}`)}>
                        {project.contact_email}
                      </LinkTextSourceSans>
                    </TextSourceSans>
                  }
                  {!!project.contact_url &&
                    <TextSourceSans style={styles.contactField}>
                      <TextSourceSans style={styles.contactLabel}>
                        Website: </TextSourceSans>
                      <LinkTextSourceSans
                        onPress={() => Linking.openURL(project.contact_url)}>
                        {project.contact_url}
                      </LinkTextSourceSans>
                    </TextSourceSans>
                  }
                </>
                }
              </View>
            }
            {visibleTab === tabs.results &&
              <Richtext text={project.result} />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
