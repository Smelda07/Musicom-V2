import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSurveyStore } from "../../context/useSurveyStore";

const EVENT_TYPES = [
  "Concerts",
  "Festivals",
  "Jam Sessions",
  "Open Mic",
  "Competitions",
  "Workshops",
  "Theatre / Musical",
  "Street music events",
];

export default function OnBoardingEvents() {
  const { chosenEvents, toggleEvent } = useSurveyStore();

  const isSelected = (event) => chosenEvents.includes(event);

  return (
    <View className="bg-primary flex-1 pt-6 px-4">
      <ScrollView>
        {EVENT_TYPES.map((event, index) => (
          <TouchableOpacity
            key={index}
            className={`w-full p-4 rounded-2xl mb-3 flex-row items-center justify-between ${
              isSelected(event) ? "bg-[#3CFFDF33]" : "bg-zinc-800"
            }`}
            onPress={() => toggleEvent(event)}
          >
            <Text className="text-white text-lg font-semibold">{event}</Text>

            <View
              className={`w-6 h-6 rounded-md border-2 ${
                isSelected(event) ? "border-[#3CFFDF] bg-[#3CFFDF]" : "border-white"
              }`}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
