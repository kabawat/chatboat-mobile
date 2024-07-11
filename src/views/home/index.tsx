import { View, Text } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '@utils/comman'

const Home = () => {
  return (
    <View style={{ width: windowWidth, height: windowHeight, backgroundColor: 'red' }}>
      <Text>Home</Text>
    </View>
  )
}

export default Home