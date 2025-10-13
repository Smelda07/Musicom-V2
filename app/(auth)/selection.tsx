import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

export default function SelectingScreen() {
  const [role, setRole] = useState<"musician" | "organizer" | "user" | null>(null);

  const handleSelect = (selectedRole: "musician" | "organizer" | "user") => {
    setRole(selectedRole);
    router.push(`/onBoarding_instruments`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-2xl mb-8">Who are you?</Text>

      <TouchableOpacity
        className="bg-zinc-800 w-60 p-4 rounded-2xl mb-4"
        onPress={() => handleSelect("musician")}
      >
        <Text className="text-center text-white">Musician</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-zinc-800 w-60 p-4 rounded-2xl mb-4"
        onPress={() => handleSelect("organizer")}
      >
        <Text className="text-center text-white">Organizer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-zinc-800 w-60 p-4 rounded-2xl"
        onPress={() => handleSelect("user")}
      >
        <Text className="text-center text-white">User</Text>
      </TouchableOpacity>
    </View>
  );
}
