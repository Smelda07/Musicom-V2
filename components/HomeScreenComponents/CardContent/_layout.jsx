import { View, Text, TouchableOpacity, Image } from "react-native";

export default function PostCard({
  author,
  avatar,
  location,
  time,
  type,
  typeColor,
  children,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-neutral-900 rounded-2xl mb-4 overflow-hidden"
    >
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-3">
        <Image
          source={{ uri: avatar }}
          className="w-10 h-10 rounded-full mr-3 bg-neutral-700"
        />

        <View className="flex-1">
          <Text className="text-white font-semibold text-sm">
            {author}
          </Text>
          <Text className="text-neutral-400 text-xs">
            {location} · {time}
          </Text>
        </View>

        {/* TYPE BADGE */}
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: typeColor }}
        >
          <Text className="text-black text-xs font-semibold">
            {type}
          </Text>
        </View>
      </View>

      {/* CONTENT (specific per type) */}
      <View className="px-4 pb-3">
        {children}
      </View>

      {/* FOOTER ACTIONS */}
      <View className="flex-row justify-between items-center px-4 py-3 border-t border-neutral-800">
        <View className="flex-row space-x-4">
          <Action icon="❤️" />
          <Action icon="💬" />
          <Action icon="📌" />
        </View>

        <Action icon="➕" />
      </View>
    </TouchableOpacity>
  );
}

function Action({ icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-lg">{icon}</Text>
    </TouchableOpacity>
  );
}
