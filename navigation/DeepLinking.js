import React, { useEffect } from 'react'
import { useAuthorization } from '../containers/Auth/AuthProvider.js'
import { View } from 'react-native'

export const DeepLinking = (props) => {
  const { loading, token, setDeepLink } = useAuthorization()

  useEffect(() => {
    if(loading){
      return
    }
    setDeepLink(props.route.params.projectSlug)
    if (token === null) {
      props.navigation.replace('Auth')
    } else {
      props.navigation.replace('ExplorePage')
    }

  }, [loading, props.route.params])

  return <View></View>
}
