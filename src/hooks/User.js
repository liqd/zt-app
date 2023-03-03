import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getUser } from '../BaseApi'

export function useUser(userId) {
  const [user, setUser] = useState(null)
  let isLoading = false

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        const response = await getUser(userId, token)
        if (response) {
          if(response.statusCode === 200 && !isLoading) {
            setUser(response.data)
          }
        }
      } catch(error) {
        error => console.warn(error)
      }
    }
    fetchUser()
    return () => isLoading = true
  }, [userId])

  return user
}
