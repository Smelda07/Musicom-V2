import { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Pressable, Keyboard, Alert } from 'react-native';
import { getAllInstruments, getCommonInstruments } from "../../constants/instruments.js";
import { useSurveyStore } from "../../context/useSurveyStore.js";

const MAX_SELECTION = 2; // Maximální počet vybraných nástrojů

const OnBoardingInstruments = () => {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null); // Reference na TextInput

  const { chosenInstruments, toggleInstrument } = useSurveyStore(); // Použití globálního stavu

  const commonInstruments = getCommonInstruments(true);

  // Filtrování nástrojů podle hledaného textu
  const filteredInstruments = Object.values(getAllInstruments()) // Převede objekt na pole hodnot
  .filter(instrument => instrument.toLowerCase().startsWith(searchText.toLowerCase())) // Filtrování podle názvu
  .filter(instrument => !chosenInstruments.includes(instrument)) // Nezobrazuje již vybrané nástroje
  .sort((a, b) => a.localeCompare(b)); // Seřazení podle názvu


  return (
    <Pressable 
      onPress={() => {
        Keyboard.dismiss(); // Skryje klávesnici
        setShowDropdown(false); // Skryje dropdown pouze pokud uživatel klikne mimo TextInput a návrhy
      }} 
      className="flex-1 bg-primary"
    >
      <View className="bg-primary">
        <View className="mx-4">
          <Text className="text-lg text-white mt-8">Find your Instrument</Text>
          <View className="mt-4 relative">
            <TextInput
              ref={inputRef}
              className="border text-md border-gray-500 rounded-md px-4 py-3 text-white"
              placeholder="Type an instrument..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setShowDropdown(text.length > 0);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            
            {/* "X" tlačítko pro vymazání */}
            {searchText.length > 0 && (
              <TouchableOpacity 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onPress={() => {
                  setSearchText('');
                  setShowDropdown(false);
                  inputRef.current?.focus();
                }}
              >
                <View>
                  <Text className="text-white text-lg font-regular">✖</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Dropdown seznam */}
            {showDropdown && (
              <View className="absolute top-full left-0 bg-gray-800 w-full mt-1 rounded-md overflow-hidden z-10">
                {filteredInstruments.map((instrument, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="p-3 border-b border-gray-600"
                    onPress={() => {
                      if (chosenInstruments.length >= MAX_SELECTION) {
                        Alert.alert("Limit Reached", `You can select up to ${MAX_SELECTION} instruments.`);
                        return;
                      }
                      toggleInstrument(instrument);
                      setSearchText('');
                      setShowDropdown(false);
                      Keyboard.dismiss(); // Skryje klávesnici
                    }}
                  >
                    <Text className="text-white">{instrument}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* The most common instruments */}
          <Text className="text-lg text-white mt-6">The Most Common</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {Object.values(commonInstruments).map((instrument, index) => {
              const isSelected = chosenInstruments.includes(instrument);
              return (
                <TouchableOpacity
                  key={index}
                  className={`rounded-full px-4 py-2 w-auto ${isSelected ? "bg-gray-600 opacity-50" : "bg-[#00836D]"}`}
                  onPress={() => {
                    if (chosenInstruments.length >= MAX_SELECTION) {
                      Alert.alert("Limit Reached", `You can select up to ${MAX_SELECTION} instruments.`);
                      return;
                    }
                    toggleInstrument(instrument);
                  }}
                >
                  <Text className="text-white font-semibold text-center text-base">
                    {instrument}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Your chosen instruments */}
          <Text className="text-lg text-white mt-6">Your Chosen Instruments</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {chosenInstruments.map((instrument, index) => (
              <TouchableOpacity 
                key={index} 
                className="bg-[#004D40] rounded-full px-4 py-2 flex-row items-center"
                onPress={() => toggleInstrument(instrument)}
              >
                <Text className="text-white font-semibold text-center text-base mr-2">
                  {instrument}
                </Text>
                <TouchableOpacity onPress={() => toggleInstrument(instrument)}>
                  <Text className="text-red-500 font-bold">X</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default OnBoardingInstruments;
