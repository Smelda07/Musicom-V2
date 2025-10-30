import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { router } from 'expo-router';

export default function SelectingScreen() {
  const [role, setRole] = useState(null);

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    router.push('/onBoarding_instruments');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <TouchableOpacity 
        className="pt-8 pl-7" 
        activeOpacity={0.5} 
        onPress={() => router.push('/')}
        >
          <BackArrow width={30} height={30}/>
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center bg-black">
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
          onPress={() => handleSelect("user")}
        >
          <Text className="text-center font-semibold text-white">User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
