import React, {useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({
  loading: true,
  token: null,
  signIn: () => {},
  signOut: () => {},
});

export const useAuthorization = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    console.log('Couldn\'t find auth context');
  }
  return context;
};

export const AuthProvider = (props) => {
  const [state, setState] = React.useState({
    loading: true,
    token: null,
  });
  useEffect(() => {
    const tryLogin = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      setState({
        ...state,
        loading: false,
        token: authToken,
      });
    };
    tryLogin();
  }, []);

  const actions = useMemo(() => ({
    signIn: async (authToken) => {
      AsyncStorage.setItem('authToken', authToken);
      setState({ ...state, loading: false, token: authToken });
    },
  }));
  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </AuthContext.Provider>
  );
};
