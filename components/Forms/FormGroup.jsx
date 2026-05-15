import React from 'react';
import { View, Text } from 'react-native';

export const FormGroup = ({ label, error, children }) => {
  return (
    <View className="mb-4">
      <Text className="font-bold text-gray-800 mb-1">{label}</Text>
      {children}
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};