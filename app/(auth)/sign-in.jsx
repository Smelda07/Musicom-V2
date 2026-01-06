import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import BackArrow from "../../assets/icons/auth-icons/BackArrow.svg";

import { useGlobalContext } from "../../context/GlobalProvider";
import { signIn } from "../../api/auth";

const SignIn = () => {
  const { setUser } = useGlobalContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await signIn(form.email, form.password);
      const user = data.user;

      setUser({
        id: user.id,
        emailVerified: user.emailVerified,
        needsQuestionnaire: user.needsQuestionnaire,
        role: user.role || "user",
        username: user.username || "",
        firstname: user.firstName || "",
        lastname: user.lastName || "",
      });

      // Redirect podle stavu účtu
      if (!user.emailVerified) {
        router.replace("/verify-email");
        return;
      }
      if (user.needsQuestionnaire) {
        router.replace("/questionnaire");
        return;
      }
      router.replace("/home");
    } catch (error) {
      console.error("❌ Sign-in error:", error);
      Alert.alert("Error", error.message || "Sign in failed");
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

        <Text className="text-3xl text-[#3CFFDF] text-roboto font-medium text-center mt-[10vh]">
          Musicom
        </Text>

        <View className="w-full justify-center min-h-[60vh] px-8 my-6">
          <FormField
            title="Email or username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="name@example.com"
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
          />

          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
