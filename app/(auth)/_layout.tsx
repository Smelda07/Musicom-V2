import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

const AuthLayout = () => {
  
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="sign-up"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="selection"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout