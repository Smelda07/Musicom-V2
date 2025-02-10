import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { genres_list } from "../../constants/genres.js";

const OnBoardingGenres = () => {
  const [searchText, setSearchText] = useState('');
  const [chosenGenres, setChosenGenres] = useState([]);

  const commonGenres = [
    "Rock", "Heavy metal", "Jazz", "Hip hop", "Blues",
    "Death metal", "Thrash metal", "Reggae", "Classical"
  ];

  // Přidání nebo odebrání vybraného nástroje
  const toggleGenre = (genre) => {
    if (chosenGenres.includes(genre)) {
      setChosenGenres(chosenGenres.filter(item => item !== genre));
    } else {
      setChosenGenres([...chosenGenres, genre]);
    }
  };

  // Filtrování nástrojů podle hledaného textu
  const filteredGenres = genres_list
    .filter(genre => genre.toLowerCase().startsWith(searchText.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <>
      <ScrollView className="bg-primary">
        <View className="mx-4">
          <Text className="text-lg text-white mt-8">Find your Genre</Text>
          <View className="mt-4 relative">
            <TextInput
              className="border text-md border-gray-500 rounded-md px-4 py-3 text-white"
              placeholder="Type an genre..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <View className="absolute top-full left-0 bg-gray-800 w-full mt-1 rounded-md overflow-hidden z-10">
                {filteredGenres.map((genre, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="p-3 border-b border-gray-600"
                    onPress={() => toggleGenre(genre)}
                  >
                    <Text className="text-white">{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* The most common genres */}
          <Text className="text-lg text-white mt-6">The most common</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {commonGenres.map((genre, index) => {
              const isSelected = chosenGenres.includes(genre);
              return (
                <TouchableOpacity
                  key={index}
                  className={`rounded-full px-4 py-2 w-auto ${isSelected ? "bg-[#004D40]" : "bg-[#00836D]"}`}
                  onPress={() => toggleGenre(genre)}
                >
                  <Text className="text-white font-semibold text-center text-base">
                    {genre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Your chosen genre */}
          <Text className="text-lg text-white mt-6">Your chosen Genre</Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {chosenGenres.map((genre, index) => (
              <View key={index} className="bg-[#004D40] rounded-full px-4 py-2 flex-row items-center">
                <Text className="text-white font-semibold text-center text-base mr-2">
                  {genre}
                </Text>
                <TouchableOpacity onPress={() => toggleGenre(genre)}>
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

export default OnBoardingGenres;
