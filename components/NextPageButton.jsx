import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

const NextPageButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  Icon,
  iconPosition,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-[#1D1D1D] rounded-[6px] min-h-[40px] justify-center items-center flex-row ${
        containerStyles
      } ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      {/* Logika pro pozici ikony */}
      {iconPosition === "left" && Icon && (
        <View className="mr-5">{Icon}</View>
      )}
      <Text className={`text-white font-semibold text-xl ${textStyles}`}>
        {title}
      </Text>
      {iconPosition === "right" && Icon && (
        <View className="ml-4">{Icon}</View>
      )}
    </TouchableOpacity>
  );
};

export default NextPageButton;
