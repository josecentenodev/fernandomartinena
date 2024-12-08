import React from 'react'
import { RegisterForm } from './_components/RegisterForm'
import { Container } from '@mantine/core'

const RegisterPage = () => {
  return (
    <Container h={"100vh"} className="flex items-center justify-center"><RegisterForm /></Container>
  )
}

export default RegisterPage