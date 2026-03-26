import React from 'react'

const BeforeLogin: React.FC = () => {
  if (process.env.PAYLOAD_PUBLIC_SEED === 'true') {
    return (
      <p>
        {'Log in with the email '}
        <strong>demo@mzinga.io</strong>
        {' and the password '}
        <strong>demo</strong>.
      </p>
    )
  }
  return null
}

export default BeforeLogin
