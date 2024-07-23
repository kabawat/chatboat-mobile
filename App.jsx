import React, { createContext, useContext, useEffect, useState } from 'react'
import QuryBoat from './queryboat'
import { Provider } from 'react-redux'
import store from 'redux_store/index'
import io from 'socket.io-client'
const environment = process.env.ENVIRONMENT
const fetchBaseURL = () => {
  if (environment == "development") {
    return process.env.APP_LOCAL_SOCKET_URL
  }
  if (environment == "production") {
    return process.env.APP_PRODUCTION_SOCKET_URL
  }
}
const SocketContext = createContext(null)
const App = () => {

  const [socketIO, setSocketIO] = useState(null)
  useEffect(() => {
    const baseURL = fetchBaseURL()
    const socket = io(baseURL)
    setSocketIO(socket)
    function onConnect() {
      console.log('connected')
    }

    function onDisconnect() {
      console.log(socket.id)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [])
  return (
    <SocketContext.Provider value={socketIO}>
      <Provider store={store}>
        <QuryBoat />
      </Provider>
    </SocketContext.Provider>
  )
}

export default App

export function useSocket() {
  return useContext(SocketContext)
}