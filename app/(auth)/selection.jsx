import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { router } from 'expo-router';
import { useSurveyStore } from "../../context/useSurveyStore";

export default function SelectingScreen() {
  const { setRole } = useSurveyStore();

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);

    if (selectedRole === "musician") {
      router.push('/onBoarding_instruments');
    } else if (selectedRole === "organizer") {
      router.push('/onBoarding_organization');
    } else {
      router.push('/onBoarding_genres'); // fan
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full flex justify-between">
      <TouchableOpacity
        className="pt-8 pl-7" 
        activeOpacity={0.5} 
        onPress={() => router.push('/')}
      >
        <BackArrow width={30} height={30}/>
      </TouchableOpacity>

      <View className="flex justify-center items-center">
        <Text className="text-white text-2xl mb-8">Who are you?</Text>

        <TouchableOpacity
          className="bg-zinc-800 w-60 p-4 rounded-2xl mb-4"
          onPress={() => handleSelect("musician")}
        >
          <Text className="text-center font-semibold text-white">Musician</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-zinc-800 w-60 p-4 rounded-2xl mb-4"
          onPress={() => handleSelect("organizer")}
        >
          <Text className="text-center font-semibold text-white">Organizer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-zinc-800 w-60 p-4 rounded-2xl"
          onPress={() => handleSelect("fan")}
        >
          <Text className="text-center font-semibold text-white">Fan</Text>
        </TouchableOpacity>
      </View>

      <View className="h-[10%]"/>
    </SafeAreaView>
  );
}
