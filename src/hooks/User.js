import { useEffect, useState } from 'react'

import { getUser } from '../BaseApi'

export function useUser(userId) {
  const [user, setUser] = useState(null)
  let isLoading = false

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId)
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
