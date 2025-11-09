import React from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useSurveyStore } from "../../context/useSurveyStore";
import { Trash2 } from "lucide-react-native"; 

const OnBoardingOrganization = () => {
  const { organizationNames, setOrganizationNames } = useSurveyStore();

  const handleAddAnother = () => {
    setOrganizationNames([...organizationNames, ""]);
  };

  const handleChangeText = (text, index) => {
    const updated = [...organizationNames];
    updated[index] = text;
    setOrganizationNames(updated);
  };

  const handleRemove = (index) => {
    if (organizationNames.length === 1) return;
    const updated = organizationNames.filter((_, i) => i !== index);
    setOrganizationNames(updated);
  };

  return (
    <ScrollView className="bg-primary px-4 pt-5">
      <Text className="text-white text-lg font-semibold mb-3">
        Název akce / organizace
      </Text>

      {organizationNames.map((item, index) => (
        <View
          key={index}
          className="bg-[#1E1E1E] rounded-xl p-4 mb-3 border border-[#2E2E2E]"
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[#9C9C9C]">{`Název ${index + 1}`}</Text>
            {organizationNames.length > 1 && (
              <Pressable onPress={() => handleRemove(index)} className="p-1 opacity-80">
                <Trash2 size={18} color="#888" />
              </Pressable>
            )}
          </View>

          <TextInput
            className="h-11 bg-[#2A2A2A] rounded-lg px-3 text-[#EDEDED]"
            value={item}
            onChangeText={(text) => handleChangeText(text, index)}
            placeholder={`např. Obscene Extreme`}
            placeholderTextColor="#7A7A7A"
          />
        </View>
      ))}

      <Pressable
        onPress={handleAddAnother}
        className="mt-2 bg-[#2A2A2A] rounded-xl h-12 items-center justify-center border border-[#3A3A3A]"
      >
        <Text className="text-[#EDEDED] font-medium">+ Přidat další</Text>
      </Pressable>

      <View className="h-10" />
    </ScrollView>
  );
};

export default OnBoardingOrganization;
