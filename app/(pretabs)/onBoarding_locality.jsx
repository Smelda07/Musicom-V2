import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const data = {
  "Česko": ["Praha", "Brno", "Ostrava"],
  "Slovensko": ["Bratislava", "Košice", "Prešov"],
  "Německo": ["Berlín", "Mnichov", "Hamburk"],
};

const OnBoardingLocality = () => {
  const [selectedState, setSelectedState] = useState(Object.keys(data)[0]);
  const [selectedCity, setSelectedCity] = useState(data[selectedState][0]);

  return (
    <>
      <ScrollView className="bg-primary">
        <View className="mx-4">
          <Text className="text-lg text-white mt-6">Select location</Text>
          <View className="mt-4 bg-white rounded-md">
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue) => {
                setSelectedState(itemValue);
                setSelectedCity(data[itemValue][0]);
              }}
            >
              {Object.keys(data).map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>
          </View>
          <View className="mt-4 bg-white rounded-md">
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
            >
              {data[selectedState].map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OnBoardingLocality;