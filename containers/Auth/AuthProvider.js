import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = React.createContext({
  loading: true,
  token: null,
  deepLink: null,
  signIn: () => {},
  signOut: () => {},
})

export const useAuthorization = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    console.log('Couldn\'t find auth context')
  }
  return context
}

export const AuthProvider = (props) => {
  const [state, setState] = React.useState({
    loading: true,
    token: null,
    deepLink: null
  })
  React.useEffect(() => {
    const tryLogin = async () => {
      const authToken = await AsyncStorage.getItem('authToken')
      setState({
        ...state,
        loading: false,
        token: authToken,
      })
    }
    tryLogin()
  }, [])

  const actions = React.useMemo(() => ({
    signIn: async (authToken) => {
      AsyncStorage.setItem('authToken', authToken)
      setState({ ...state, loading: false, token: authToken })
    },
    signOut: async () => {
      AsyncStorage.removeItem('authToken')
      setState({ ...state, loading: false, token: null })
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
