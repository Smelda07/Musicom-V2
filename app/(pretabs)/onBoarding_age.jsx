import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { useSurveyStore } from "../../context/useSurveyStore";

const OnBoardingAge = () => {
  const { birthYear, setBirthYear } = useSurveyStore();
  const currentYear = new Date().getFullYear();

  const yearNum = parseInt(birthYear);
  const age = yearNum ? currentYear - yearNum : null;
  const isValidYear = yearNum >= 1900 && yearNum <= currentYear;
  const showUnderageError = age !== null && age < 13;
  const showInvalidYearError = birthYear && !isValidYear;

  return (
    <ScrollView className="bg-primary flex-1 p-4">
      <View className="items-center justify-center mt-4">
        <Text className="text-white text-lg font-bold mb-4">
          Enter your year of birth:
        </Text>

        <TextInput
          className="bg-[#EFEFEF] text-black text-center rounded-lg w-40 p-3 text-lg"
          placeholder="E.g. 2000"
          keyboardType="numeric"
          maxLength={4}
          value={birthYear}
          onChangeText={(text) => {
            if (/^\d{0,4}$/.test(text)) {
              setBirthYear(text); // Ukládání do store
            }
          }}
        />

        {isValidYear && (
          <Text className="text-white text-lg font-semibold mt-4">
            You are: {age} years old
          </Text>
        )}

        {/* Chybové hlášky */}
        {showUnderageError ? (
          <Text className="text-red-400 text-sm mt-2">
            ⚠️ You have to be at least 13 years old.
          </Text>
        ) : showInvalidYearError ? (
          <Text className="text-red-400 text-sm mt-2">
            ⚠️ Enter a year between 1900 and {currentYear}.
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default OnBoardingAge;
