import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { signIn, getAccount, getCurrentUser } from '@/lib/appwrite';
import { Alert } from 'react-native';

import { Redirect } from 'expo-router';

import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isSubmitting, setSubmitting] = useState(false)

  // Správa viditelnosti hesel
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }


    setSubmitting(true);

    try {
      await signIn(form.email, form.password);


      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      console.log("User signed in successfully");

      <Redirect href="/homes"/>;
      
    } catch (error) {
      console.log("error sign-in:49")
      console.log(error.message)
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <TouchableOpacity 
          className="pt-8 pl-7" 
          activeOpacity={0.5} 
          onPress={() => router.push('/')}
        >
          <BackArrow width={30} height={30}/>
        </TouchableOpacity>
        <Text className="text-3xl text-[#3CFFDF] text-roboto font-medium text-center mt-[10vh]">Musicom</Text>
        <View className="w-full justify-center min-h-[60vh] px-8 my-6">
          <FormField
            title="Email or username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keybordType="email-address"
            placeholder="name@example.com"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
            placeholder="●●●●●●●●"
            secureTextEntry={!showPassword}
            isPasswordVisible={showPassword} // Stav viditelnosti hesla
            toggleVisibility={() => setShowPassword(!showPassword)} // Přepnutí viditelnosti hesla
          />

          <CustomButton
            title="Sign in"
            handlePress={() => submit()}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#979797] font-regular">
              Forgot your Password?
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn