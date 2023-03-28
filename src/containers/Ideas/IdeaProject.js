import React, { useEffect,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image,ImageBackground, Linking, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconFA from 'react-native-vector-icons/FontAwesome'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'

import API from '../../BaseApi'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { Header } from '../../components/Header'
import { LinkTextSourceSans } from '../../components/LinkTextSourceSans'
import { Richtext } from '../../components/Richtext'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { StickyContainer } from '../../components/StickyContainer'
import { TextSourceSans } from '../../components/TextSourceSans'
import { COLORS } from '../../theme/colors'

import { styles } from './IdeaProject.styles'
import { IdeasList } from './IdeasList'
import { Phase } from './Phase'

export const IdeaProject = (props) => {
  const { t } = useTranslation()
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

  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper} />
  const sortIcon = <IconFA name='filter' size={20} color={COLORS.grey.light} />
  const filterIcon = (
    <IconFA name='search' size={20} color={COLORS.grey.light} />
  )

  const followButton = (
    <Button
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}
      title={t('Follow')}
      icon={plusIcon}
      type='clear'
      accessible={false}
    />
  )

  const fetchIdeas = () => {
    project.single_idea_collection_module &&
      API.getIdeas(project.single_idea_collection_module)
        .then(ideaResponse => {
          setIdeas(ideaResponse.data)
        })
  }

  const fetchModule = () => {
    API.getModule(project.single_idea_collection_module)
      .then(moduleResponse => {
        setModule(moduleResponse.data)
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
    <SafeAreaView style={styles.container}>
      <StatusBarStyled
        lightContent={true}
      />
      <ImageBackground
        style={styles.bgImage}
        source={{ uri: bgImage }}
        accessibilityIgnoresInvertColors={true}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.80)', 'rgba(0,0,0,0.00)']}
        style={styles.linearGradient}
      />
      <ScrollView
        style={visibleTab === tabs.participation && module.has_idea_adding_permission &&
          styles.scrollContainer
        }
      >
        <Header
          transparent={true}
          arrowColor={COLORS.paper}
          backButtonStyle={styles.button}
          backButtonTextStyle={styles.buttonText}
          rightButton={followButton}
          navigation={props.navigation} />
        <View style={styles.overlayContainer}>
          <View style={styles.infoContainer}>
            <TextSourceSans style={styles.title} accessibilityRole="header">
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
              <TextSourceSans style={styles.organisationName} numberOfLines={1}>
                {project.organisation}
              </TextSourceSans>
            </View>
            <View style={styles.tabsMenu}>
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={visibleTab === tabs.participation ?
                  [ styles.tabsMenuItem, styles.tabsMenuItemActive ] :
                  styles.tabsMenuItem
                }
                title={t('Participation')}
                type='clear'
                onPress={() => setVisibleTab(tabs.participation)}
              />
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={visibleTab === tabs.information ?
                  [ styles.tabsMenuItem, styles.tabsMenuItemActive ] :
                  styles.tabsMenuItem
                }
                title={t('Information')}
                type='clear'
                onPress={() => setVisibleTab(tabs.information)}
              />
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={visibleTab === tabs.results ?
                  [ styles.tabsMenuItem, styles.tabsMenuItemActive ] :
                  styles.tabsMenuItem
                }
                title={t('Results')}
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
                      <Button icon={filterIcon} type='clear' disabled />
                      <Button icon={sortIcon} type='clear' disabled />
                    </View>
                    <View style={styles.listContainer}>
                      <IdeasList
                        ideas={ideas}
                        module={module}
                        navigation={props.navigation}
                      />
                    </View>
                  </View>
                ) : (
                  <TextSourceSans>
                    {t('Oops. Multiple module projects are not supported in adhocracy+ app,'
                        + ' yet! Please find them on adhocracy+ web.')}
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
                    {t('Contact for Questions')}
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
                        {t('Telephone:')} </TextSourceSans>
                      {project.contact_phone}
                    </TextSourceSans>
                  }
                  {!!project.contact_email &&
                    <TextSourceSans style={styles.contactField}>
                      <TextSourceSans style={styles.contactLabel}>
                        {t('Email:')} </TextSourceSans>
                      <LinkTextSourceSans
                        onPress={() => Linking.openURL(`mailto:${project.contact_email}`)}>
                        {project.contact_email}
                      </LinkTextSourceSans>
                    </TextSourceSans>
                  }
                  {!!project.contact_url &&
                    <TextSourceSans style={styles.contactField}>
                      <TextSourceSans style={styles.contactLabel}>
                        {t('Website:')} </TextSourceSans>
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
      {visibleTab === tabs.participation && module.has_idea_adding_permission && (
        <StickyContainer>
          <ButtonSubmit
            title={t('Submit Idea')}
            onPress={pressHandler}
          ></ButtonSubmit>
        </StickyContainer>
      )}
    </SafeAreaView>
  )
}
