import { useEffect, useState } from 'react'

import { getUser } from '../BaseApi'

export function useAuthenticatedUser(token) {
  const [user, setUser] = useState(null)
  let isLoading = false

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(null)
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
  }, [token])

  return user
}
