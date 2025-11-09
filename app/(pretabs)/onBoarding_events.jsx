import { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Pressable, Keyboard, Alert } from 'react-native';
import { genres_list } from "../../constants/genres.js";
import { useSurveyStore } from "../../context/useSurveyStore.js"; // Použití globálního stavu

const MAX_SELECTION = 3; // Maximální počet vybraných žánrů

const OnBoardingEvents = () => {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null); // Reference na TextInput

  const { chosenGenres, toggleGenre } = useSurveyStore(); // Použití globálního stavu

  const commonGenres = [
    "Rock", "Heavy Metal", "Jazz", "Hip Hop", "Blues",
    "Death Metal", "Thrash Metal", "Reggae", "Classical"
  ];

  // Filtrování žánrů podle hledaného textu a odstranění už vybraných
  const filteredGenres = genres_list
    .filter(genre => genre.toLowerCase().startsWith(searchText.toLowerCase()))
    .filter(genre => !chosenGenres.includes(genre)) // Nezobrazovat již vybrané žánry
    .sort((a, b) => a.localeCompare(b));

  return (
    <Pressable 
      onPress={() => {
        Keyboard.dismiss(); // Skryje klávesnici
        setShowDropdown(false); // Skryje dropdown
      }} 
      className="flex-1 bg-primary"
    >
      <View className="bg-primary">
        <View className="mx-4">
          <Text className="text-lg text-white mt-8">Find your Genre</Text>
          <View className="mt-4 relative">
            <TextInput
              ref={inputRef}
              className="border text-md border-gray-500 rounded-md px-4 py-3 text-white"
              placeholder="Type a genre..."
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
                <Text className="text-white text-lg font-regular">✖</Text>
              </TouchableOpacity>
            )}

            {/* Dropdown seznam */}
            {showDropdown && (
              <View className="absolute top-full left-0 bg-gray-800 w-full mt-1 rounded-md overflow-hidden z-10">
                {filteredGenres.map((genre, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="p-3 border-b border-gray-600"
                    onPress={() => {
                      if (chosenGenres.length >= MAX_SELECTION) {
                        Alert.alert("Limit Reached", `You can select up to ${MAX_SELECTION} genres.`);
                        return;
                      }
                      toggleGenre(genre);
                      setSearchText('');
                      setShowDropdown(false);
                      Keyboard.dismiss(); // Skryje klávesnici
                    }}
                  >
                    <Text className="text-white">{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* The most common genres */}
          <Text className="text-lg text-white mt-6">The Most Common</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {commonGenres.map((genre, index) => {
              const isSelected = chosenGenres.includes(genre);
              return (
                <TouchableOpacity
                  key={index}
                  className={`rounded-full px-4 py-2 w-auto ${isSelected ? "bg-gray-600 opacity-50" : "bg-[#00836D]"}`}
                  onPress={() => {
                    if (chosenGenres.length >= MAX_SELECTION) {
                      Alert.alert("Limit Reached", `You can select up to ${MAX_SELECTION} genres.`);
                      return;
                    }
                    toggleGenre(genre);
                  }}
                >
                  <Text className="text-white font-semibold text-center text-base">
                    {genre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Your chosen genres */}
          <Text className="text-lg text-white mt-6">Your Chosen Genres</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {chosenGenres.map((genre, index) => (
              <TouchableOpacity 
                key={index} 
                className="bg-[#004D40] rounded-full px-4 py-2 flex-row items-center"
                onPress={() => toggleGenre(genre)} // Kliknutím na celou buňku se smaže
              >
                <Text className="text-white font-semibold text-center text-base mr-2">
                  {genre}
                </Text>
                <TouchableOpacity onPress={() => toggleGenre(genre)}>
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

export default OnBoardingEvents;
