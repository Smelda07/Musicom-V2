import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, FlatList, Alert } from "react-native";
import { genres_list } from "../../../constants/genres";

export default function GenreSelector({ selectedGenres, onChange, maxSelection = 3 }) {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      onChange(selectedGenres.filter(g => g !== genre));
    } else {
      if (selectedGenres.length >= maxSelection) {
        Alert.alert("Limit reached", `You can select up to ${maxSelection} genres.`);
        return;
      }
      onChange([...selectedGenres, genre]);
    }
  }

  const filteredGenres = genres_list
  .filter(genre =>
    genre.toLowerCase().startsWith(searchText.toLowerCase())
  )
  .filter(genre => !selectedGenres.includes(genre))
  .sort((a, b) => a.localeCompare(b));

  return (
    <View className="relative mb-4">
      <TextInput
        placeholder="Type a genre..."
        placeholderTextColor="#888"
        value={searchText}
        onFocus={() => setShowDropdown(true)}
        onChangeText={text => {
          setSearchText(text);
          setShowDropdown(text.length > 0);
        }}
        className="border border-gray-500 rounded-md px-3 py-2 text-white"
      />

      {searchText.length > 0 && (
        <TouchableOpacity
          className="absolute right-3 top-2"
          onPress={() => { setSearchText(''); setShowDropdown(false); }}
        >
          <Text className="text-white">✖</Text>
        </TouchableOpacity>
      )}

      {showDropdown && filteredGenres.length > 0 && (
        <FlatList
          data={filteredGenres}
          keyExtractor={(item, index) => item + index}
          style={{
            position: 'absolute',
            top: 45, // pod inputem
            left: 0,
            width: '100%',
            maxHeight: 200,
            backgroundColor: '#252525ff',
            borderRadius: 6,
            zIndex: 9999,
            elevation: 9999,
          }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ padding: 8, borderBottomColor: '#374151', borderBottomWidth: 1 }}
              onPress={() => {
                toggleGenre(item);
                setSearchText('');
                setShowDropdown(false);
                Keyboard.dismiss();
              }}
            >
              <Text className="text-white">{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Selected genres */}
      {selectedGenres.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-2">
          {selectedGenres.map((genre, idx) => (
            <TouchableOpacity
              key={idx}
              className="bg-[#004D40] rounded-full px-3 py-1 flex-row items-center"
              onPress={() => toggleGenre(genre)}
            >
              <Text className="text-white text-xs mr-1">{genre}</Text>
              <Text className="text-red-500 font-bold">X</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
