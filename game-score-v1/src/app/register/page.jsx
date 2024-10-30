"use client"
import RegisterForm from 'lab1/components/RegisterForm'
import StoreProvider from 'lab1/store/provider'
import React from 'react'

const RegisterPage = () => {
  return (
    <StoreProvider>
        <RegisterForm/>
    </StoreProvider>
  )
}

export default RegisterPage
