import React from 'react'

const ProfileInfo = ({name, email}: {name: string, email: string}) => {
  return (
    <div>{name} and {email}</div>
  )
}

export default ProfileInfo