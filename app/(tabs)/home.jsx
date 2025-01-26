import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { signOut } from "../../lib/appwrite.js"
import { Redirect, router } from 'expo-router'
import { Alert } from 'react-native';

import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {

  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return router.replace("sign-in")

  return (
    <View>
        <CustomButton
              title="Odhlásit se"
              handlePress={() => {
                signOut()
                router.push("/sign-in")
              }}
              containerStyles="mt-10"
            />
            <Text>
              Blablbabl
            </Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})