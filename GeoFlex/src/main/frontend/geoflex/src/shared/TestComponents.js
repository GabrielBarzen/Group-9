import React from 'react'
import Button from './Button'
import Picture from './Picture'
import Text from './Text'
import Title from './Title'
import TextForm from './TextForm'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'
import "./style.css";


export default function TestComponents() {
  return (
    <div>TestComponents
      <Title />
      <Text />
      <Picture />
      <Button />
      <PasswordForm />
      <TextForm />
      <EmailForm />
    </div>
  )
}