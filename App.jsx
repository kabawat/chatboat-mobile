import React, { createContext, useContext, useEffect, useState } from 'react'
import QuryBoat from './queryboat'
import { Provider } from 'react-redux'
import store from 'redux_store/index'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  const setupSocket = async () => {
    try {
      const baseURL = fetchBaseURL();
      const token = await AsyncStorage.getItem('_x_s_t');
      const query = `token=${token}`;
      const socket = io(baseURL, { query });
      setSocketIO(socket);

      socket.on('connect_error', (err) => {
        console.log('Connection log:', err);
      });

      socket.on('connect_failed', (err) => {
        console.log('Connection Failed:', err);
      });

      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('disconnect', () => {
        console.log('disconnected', socket.id);
      });

      // Cleanup on component unmount
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.close(); // Close socket connection
      };
    } catch (error) {
      console.error('Error setting up socket:', error);
    }
  };
  return (
    <SocketContext.Provider value={{ socket: socketIO, setupSocket }}>
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