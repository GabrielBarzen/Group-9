import React from 'react'
import Button from './Button'
import Header from './Header'
import Picture from './Picture'
import Text from './Text'
import Title from './Title'
import "./style.css";

export default function TestComponents() {
  return (
    <div>TestComponents
      <Header />
      <Title />
      <Text />
      <Picture />
      <Button />
      
    </div>
  )
}