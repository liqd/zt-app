import React, { createContext, useContext, useEffect, useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useAuthenticatedUser } from '../../hooks/AuthenticatedUser'

const AuthContext = createContext({
  loading: true,
  token: null,
  user: null,
  deepLink: null,
  signIn: () => {},
  signOut: () => {},
})

export const useAuthorization = () => {
  const context = useContext(AuthContext)
  if (!context) {
    console.log('Couldn\'t find auth context')
  }
  return context
}

export const AuthProvider = (props) => {
  const [state, setState] = useState({
    loading: true,
    token: null,
    user: null,
    deepLink: null
  })
  const { i18n } = useTranslation()
  const user = useAuthenticatedUser(state.token)

  useEffect(() => {
    const tryLogin = async () => {
      const token = await AsyncStorage.getItem('authToken')
      setState({
        ...state,
        loading: false,
        token,
        user: null
      })
    }
    tryLogin()
  }, [])

  useEffect(() => {
    if(!state.loading) {
      if (user) {
        i18n.changeLanguage(user.language)
        // save last used language
        AsyncStorage.setItem('language', user.language)
      }
      setState({
        ...state,
        user})
    }
  }, [user])

  const actions = useMemo(() => ({
    signIn: async (token) => {
      AsyncStorage.setItem('authToken', token)
      setState({
        ...state,
        loading: false,
        token,
        user: null
      })
    },
    signOut: async () => {
      AsyncStorage.removeItem('authToken')
      setState({ ...state, loading: false, token: null, user: null })
    },
    setDeepLink: (projectSlug) => {
      setState({...state, deepLink: projectSlug})
    }
  }))
  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </AuthContext.Provider>
  )
}
