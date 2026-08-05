import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import BackArrow from "../../assets/icons/auth-icons/BackArrow.svg";

import { useGlobalContext } from "../../context/GlobalProvider";
// Importujeme naši novou sjednocenou funkci
import { handleSignUp } from "../../lib/appwrite"; 

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    // (Ponechávám tvou stávající logiku validace beze změn)
    const newErrors = {};
    let isValid = true;
    if (!form.firstname.trim()) { newErrors.firstname = "First name is required"; isValid = false; }
    if (!form.lastname.trim()) { newErrors.lastname = "Last name is required"; isValid = false; }
    if (!form.username.trim()) { newErrors.username = "Username is required"; isValid = false; }
    if (!form.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) { newErrors.email = "Invalid email address"; isValid = false; }
    if (!form.password || form.password.length < 8) { newErrors.password = "Password must be at least 8 chars"; isValid = false; }
    if (form.password !== form.confirmPassword) { newErrors.confirmPassword = "Passwords do not match"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const submit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Voláme sjednocenou funkci, která vytvoří účet i profil v DB
      await handleSignUp(
        form.email, 
        form.password, 
        form.username, 
        form.firstname, 
        form.lastname
      );

      // Nastavíme globální stav
      setUser({
        username: form.username,
        firstname: form.firstname,
        lastname: form.lastname,
      });
      setIsLoggedIn(true);

      // Přesměrování na onBoarding (dotazník)
      router.replace("/onBoarding_instruments");

    } catch (error) {
      console.error("❌ Registration error:", error);
      Alert.alert("Registration error", error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <TouchableOpacity
          className="pt-8 pl-7"
          activeOpacity={0.5}
          onPress={() => router.push("/")}
        >
          <BackArrow width={30} height={30} />
        </TouchableOpacity>

        <View className="items-center mt-[10vh]">
          <Text className="text-3xl text-[#3CFFDF] text-roboto font-medium">
            Musicom
          </Text>
        </View>

        <View className="w-full justify-center min-h-[60vh] px-8 my-6">
          <FormField
            title="First name"
            value={form.firstname}
            handleChangeText={(e) => setForm({ ...form, firstname: e })}
            otherStyles="mt-7"
            placeholder="Corey"
            error={errors.firstname}
          />

          <FormField
            title="Last name"
            value={form.lastname}
            handleChangeText={(e) => setForm({ ...form, lastname: e })}
            otherStyles="mt-7"
            placeholder="Patton"
            error={errors.lastname}
          />

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="@Bombarder28"
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
            helperText="Must be at least 8 characters."
          />

          <FormField
            title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
            placeholder="●●●●●●●●"
            secureTextEntry={!showConfirmPassword}
            isPasswordVisible={showConfirmPassword}
            toggleVisibility={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            error={errors.confirmPassword}
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-[#979797] text-lg font-medium">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => router.push("/sign-in")}
            >
              <Text className="text-[#3CFFDF] text-lg font-semibold">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
