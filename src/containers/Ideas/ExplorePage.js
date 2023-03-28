import React, { useCallback, useContext, useEffect,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList,View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CommonActions } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

import API from '../../BaseApi'
import { ButtonAvatar } from '../../components/ButtonAvatar'
import { Header } from '../../components/Header'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'
import { useAuthorization } from '../../containers/Auth/AuthProvider.js'
import { ProfileContext } from '../../contexts/ProfileContext'

import { ExploreListItem } from './ExploreListItem'
import { styles } from './ExplorePage.styles'

export const ExplorePage = (props) => {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const { user, deepLink, setDeepLink, signOut } = useAuthorization()

  useEffect(() => {
    // initially setting profile context
    if (user) {
      setProfileContext({
        userId: user.pk,
        userName: user.username,
        userImage: { uri: user.user_image },
        userImageFallback: { uri: user.user_image_fallback }
      })
    }
  }, [user])

  useFocusEffect(
    useCallback(() => {
      if (deepLink !== null){
        fetchProject().then((project) => {
          setDeepLink(null)
          if(project === null){
            // TODO show toast/alert
            console.log('deep link project not found')
          } else{
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'ExplorePage' },
                  { name: 'IdeaProject',
                    params: { project: project },
                  },
                ],
              })
            )
          }
        })
      } else {
        fetchProjects()
      }
    }, [])
  )

  const fetchProjects = () => {
    API.getProjects()
      .then((response) => {
        if(response.statusCode === 200) {
          setProjects(response.data)
        } else if (response.statusCode === 401) {
          console.warn('Unauthorized, wrong login?')
          signOut()
        } else {
          return Promise.reject(new Error('fetchProjects returned ' + response.statusCode))
        }
      }).catch(error => console.warn(error))
  }

  const fetchProject = () => {
    return API.getProject(deepLink)
      .then((result) => {
        if (result.statusCode === 200) {
          return result.data
        }
        return null
      })
  }

  const pressHandler = (project) =>
    props.navigation.navigate('IdeaProject', { project: project })

  const projectItem = ({ item }) => (
    <ExploreListItem item={item} action={(project) => pressHandler(project)} />
  )

  const toProfile = () => {
    props.navigation.navigate('ProfileScreen')
  }

  const [profileContext, setProfileContext] = useContext(ProfileContext)

  const rightHeaderButton = (
    <ButtonAvatar
      imgSource={{ uri:
        profileContext?.userImage?.uri ||
        profileContext?.userImageFallback?.uri
      }}
      a11yLabelText={t('profile')}
      a11yHintText={t('click to go to profile and settings')}
      onPress={toProfile}
    />
  )

  const leftHeaderButton = (
    <View/>
  )

  return (
    <SafeAreaView
      style={styles.flexContainer}
    >
      <StatusBarStyled />
      <View style={styles.container}>
        {user &&
          <Header
            leftButton={leftHeaderButton}
            rightButton={rightHeaderButton}
            navigation={props.navigation} />
        }
        <TextSourceSans style={styles.title} accessibilityRole="header">{t('Explore')}</TextSourceSans>
        <TextSourceSans style={styles.subtitle} accessibilityRole="header">{t('Recently Added Projects')}</TextSourceSans>
        {projects.length > 0 &&
          <FlatList
            keyExtractor={(i) => `pk${i.pk}`}
            data={projects.filter(p => p.single_idea_collection_module)}
            renderItem={projectItem}
          />
        }
      </View>
    </SafeAreaView>
  )
}
