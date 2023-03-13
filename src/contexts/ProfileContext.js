import React, { createContext, useState } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
  const [profileContext, setProfileContext] = useState()

  return (
    <ProfileContext.Provider value={[profileContext, setProfileContext]}>
      {props.children}
    </ProfileContext.Provider>
  )
}
