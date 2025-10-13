import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { signOut } from "../../lib/appwrite.js";
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser } = useGlobalContext();

  const signOutSubmit = async () => {
  try {
    if (user?.id !== "test-user") {
      await signOut();
    }

      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("❌ Sign-out error:", error);
    }
  };


  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView>
        <View className="p-5">
          <CustomButton
            title="Odhlásit se"
            handlePress={signOutSubmit}
            containerStyles="mt-10"
          />

          <Text className="mt-5 text-white text-lg">
            Přihlášený uživatel: {user?.username || "Guest"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
