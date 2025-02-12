import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';

import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  // Stav pro viditelnost hesel
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Stavy pro chyby
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // Kontrola prázdných polí
    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (form.username.trim().length < 3) {
      newErrors.username = 'Atleast 3 characters are required.';
      isValid = false;
    }

<<<<<<< HEAD
    if (!form.email.trim()) {
>>>>>>> a24c72ca3485a4ea45b0f4aedf262c7c4c57defc
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
      newErrors.email = 'Invalid email address'
      isValid = false
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Atleast 8 characters are required.';
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not matcdh';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Funkce pro odeslání formuláře
  const submit = () => {
    if (validateForm()) {
      setisSubmitting(true);
      console.log('Form submitted', form);
      createUser(form.email, form.password, form.username);

      router.push("/onBoarding_instrumentsd")

      // router.push('/onBoarding_instruments');
    } else {
      console.log(errors);
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
          <BackArrow width={30} height={30} />
        </TouchableOpacity>
        <Text className="text-3xl text-[#3CFFDF] text-roboto font-medium text-center mt-[10vh]">
          Musicom
        </Text>
        <View className="w-full justify-center min-h-[60vh] px-8 my-6">
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Corey123"
            error={errors.username}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="name@example.com"
            error={errors.email}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="●●●●●●●●"
            secureTextEntry={!showPassword}
            isPasswordVisible={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
            error={errors.password}
            helperText="Must be atleast 6 characters."
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="●●●●●●●●"
            secureTextEntry={!showPassword}
            isPasswordVisible={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
            error={errors.password}
            helperText="Must be atleast 6 characters."
          />

          <FormField
            title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
            placeholder="●●●●●●●●"
            secureTextEntry={!showConfirmPassword}
            isPasswordVisible={showConfirmPassword}
            toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword}
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <TouchableOpacity 
                activeOpacity={0.5} 
                onPress={() => router.push('/sign-in')}
              >
              <Text className="text-[#979797] text-lg font-medium">
                Already have an Account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
