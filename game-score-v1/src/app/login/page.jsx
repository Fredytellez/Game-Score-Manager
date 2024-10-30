"use client"
import LoginForm from 'lab1/components/LoginForm'
import StoreProvider from 'lab1/store/provider'
import React from 'react'

const LoginPage = () => {
  return (
    <StoreProvider>
        <LoginForm/>
    </StoreProvider>
  )
}

export default LoginPage
