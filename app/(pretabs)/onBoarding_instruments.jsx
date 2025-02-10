import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { instruments_list } from "../../constants/instruments.js";

const OnBoardingInstruments = () => {
  const [searchText, setSearchText] = useState('');
  const [chosenInstruments, setChosenInstruments] = useState([]);

  const commonInstruments = [
    "Electric guitar", "Piano", "Drums", "Violin", "Bass guitar",
    "Acoustic guitar", "Flute", "Vocal"
  ];

  // Přidání nebo odebrání vybraného nástroje
  const toggleInstrument = (instrument) => {
    if (chosenInstruments.includes(instrument)) {
      setChosenInstruments(chosenInstruments.filter(item => item !== instrument));
    } else {
      setChosenInstruments([...chosenInstruments, instrument]);
    }
  };

  // Filtrování nástrojů podle hledaného textu
  const filteredInstruments = instruments_list
    .filter(instrument => instrument.toLowerCase().startsWith(searchText.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <>
      <ScrollView className="bg-primary">
        <View className="mx-4">
          <Text className="text-lg text-white mt-8">Find your Instrument</Text>
          <View className="mt-4 relative">
            <TextInput
              className="border text-md border-gray-500 rounded-md px-4 py-3 text-white"
              placeholder="Type an instrument..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <View className="absolute top-full left-0 bg-gray-800 w-full mt-1 rounded-md overflow-hidden z-10">
                {filteredInstruments.map((instrument, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="p-3 border-b border-gray-600"
                    onPress={() => toggleInstrument(instrument)}
                  >
                    <Text className="text-white">{instrument}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* The most common instruments */}
          <Text className="text-lg text-white mt-6">The most common</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {commonInstruments.map((instrument, index) => {
              const isSelected = chosenInstruments.includes(instrument);
              return (
                <TouchableOpacity
                  key={index}
                  className={`rounded-full px-4 py-2 w-auto ${isSelected ? "bg-[#004D40]" : "bg-[#00836D]"}`}
                  onPress={() => toggleInstrument(instrument)}
                >
                  <Text className="text-white font-semibold text-center text-base">
                    {instrument}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Your chosen instruments */}
          <Text className="text-lg text-white mt-6">Your chosen Instrument</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {chosenInstruments.map((instrument, index) => (
              <View key={index} className="bg-[#004D40] rounded-full px-4 py-2 flex-row items-center">
                <Text className="text-white font-semibold text-center text-base mr-2">
                  {instrument}
                </Text>
                <TouchableOpacity onPress={() => toggleInstrument(instrument)}>
                  <Text className="text-red-500 font-bold">X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OnBoardingInstruments;
