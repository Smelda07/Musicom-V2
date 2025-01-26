import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { signOut } from "../../lib/appwrite.js"
import { Redirect, router } from 'expo-router'
import { Alert } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {

  const { user, setUser, setIsLogged } = useGlobalContext();

  const signOutSubmit = () => {
    setUser(null)
    setIsLogged(false)
    signOut()
    router.push("/sign-in")
  }


  return (
    <SafeAreaView>
      <View>
          <CustomButton
                title="Odhlásit se"
                handlePress={() => signOutSubmit()}
                containerStyles="mt-10"
              />
              <Text>
                {user?.username}
              </Text>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})