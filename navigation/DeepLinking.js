import React, { useEffect } from 'react'
import { useAuthorization } from '../containers/Auth/AuthProvider.js'
import API from '../BaseApi'
import { View } from 'react-native'

export const DeepLinking = (props) => {
  const { loading, token, setDeepLink } = useAuthorization()
  console.log(props.route)

  const fetchProject = () => {
    console.log('fetchting')
    API.getProject(
      props.route.params.organisation,
      props.route.params.projectname
    ).then((result) => {
      let project = null
      if (result.length) {
        project = result[0]
      }
      if (token) {
        if (project === null) {
          props.navigation.navigate('ExplorePage')
        } else {
          props.navigation.navigate('IdeaProject', {project: project})
        }
      } else {
        if (project.current !== null) {
          setDeepLink(project)
        }
        if (loading) {
          props.navigation.navigate('StartUp')
        } else {
          props.navigation.navigate('Auth')
        }
      }
    })
  }

  useEffect(() => {
    fetchProject()
  }, [props.route.params])

  return (
    <View></View>
  )
}
