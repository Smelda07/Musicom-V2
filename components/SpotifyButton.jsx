import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import Spotify from '../assets/icons/auth-icons/spotify.svg';

const SpotifyButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-[#121212] border border-[#252525] rounded-full min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
      <View className="absolute left-4 top-1/2 -translate-y-1/2">
        <Spotify width={30} height={30} />
      </View>
      <Text className={`text-white font-bold text-xl ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default SpotifyButton