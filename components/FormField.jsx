import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants/icons';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  secureTextEntry,
  toggleVisibility,
  isPasswordVisible,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg text-white font-semibold">{title}</Text>
      <View
        className={`flex flex-row items-center rounded-md px-4 h-14 mt-1 bg-[#101010] 
            ${isFocused ? 'border border-[#3D3D3D]' : 'border border-transparent'}
            ${error ? 'border-red-500' : ''}`}
      >
        <TextInput
          className="flex-1 text-[#A3A3A3] font-semibold text-base outline-none"
          value={value}
          placeholder={isFocused ? '' : placeholder}
          placeholderTextColor="#3D3D3D"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {(title === 'Password' || title === 'Confirm password') && (
          <TouchableOpacity onPress={toggleVisibility}>
            <Image
              source={isPasswordVisible ? icons.eye : icons.eyeHide}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormField;
