import { View, Text, Image } from "react-native"
import HighlightText from "../../components/SearchComponents/HighlightText"

export default function ProfileCard({ profile, query }) {
  return (
    <View className="bg-[#121212] rounded-3xl p-4 mb-3 flex-row items-center">
      
      <Image
        source={{ uri: profile.avatar }}
        className="w-16 h-16 rounded-full mr-4"
      />

      <View className="flex-1">

        {/* Name */}
        <HighlightText
        text={profile.name}
        query={query}
        className="text-white text-lg font-semibold"
        />

        {/* Instrument */}
        <HighlightText
          text={profile.instrument}
          query={query}
          className="text-[#00ffaaff] text-sm"
        />

        {/* Genres */}
        <HighlightText
            text={profile.genres[0]}
            query={query}
            className="text-neutral-400 text-xs mt-1"
          />

        {/* Location */}
        <HighlightText
          text={`📍 ${profile.location}`}
          query={query}
          className="text-neutral-400 text-xs mt-1"
        />
      </View>

      {/* Age */}
      <Text className="text-neutral-300 text-sm ml-3">
        {profile.age} yrs
      </Text>
    </View>
  )
}
