import React from 'react'
import QuryBoat from './queryboat'
import { Provider } from 'react-redux'
import store from 'redux_store/index'

const App = () => {
  return (
    <Provider store={store}>
      <QuryBoat />
    </Provider>
  )
}

export default App