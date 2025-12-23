import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, FlatList, Alert } from "react-native";
import { getAllInstruments } from "../../../constants/instruments";

export default function InstrumentSelector({ selectedInstruments, onChange, maxSelection = 2 }) {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleInstrument = (instrument) => {
    if (selectedInstruments.includes(instrument)) {
      onChange(selectedInstruments.filter(i => i !== instrument));
    } else {
      if (selectedInstruments.length >= maxSelection) {
        Alert.alert("Limit reached", `You can select up to ${maxSelection} instruments.`);
        return;
      }
      onChange([...selectedInstruments, instrument]);
    }
  }

  const filteredInstruments = Object.values(getAllInstruments())
    .filter(inst => inst.toLowerCase().startsWith(searchText.toLowerCase()))
    .filter(inst => !selectedInstruments.includes(inst))
    .sort((a,b) => a.localeCompare(b));

  return (
    <View className="relative mb-4">
      <TextInput
        placeholder="Type an instrument..."
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

      {showDropdown && filteredInstruments.length > 0 && (
        <FlatList
          data={filteredInstruments}
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
                toggleInstrument(item);
                setSearchText('');
                setShowDropdown(false);
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: 'white' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Selected instruments */}
      {selectedInstruments.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-2">
          {selectedInstruments.map((inst, idx) => (
            <TouchableOpacity
              key={idx}
              className="bg-[#004D40] rounded-full px-3 py-1 flex-row items-center"
              onPress={() => toggleInstrument(inst)}
            >
              <Text className="text-white text-xs mr-1">{inst}</Text>
              <Text className="text-red-500 font-bold">X</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
