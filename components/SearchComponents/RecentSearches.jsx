import { View, Text, TouchableOpacity } from "react-native"

const recent = [
  { name: "Karel Klátil", role: "Bass guitarist" },
  { name: "Jakub Novák", role: "Drummer" },
  { name: "Anicka Bálková", role: "Singer" },
]

export default function RecentSearches() {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between mb-3">
        <Text className="text-white text-lg">Recent searches</Text>
        <Text className="text-emerald-500">Clear</Text>
      </View>

      {recent.map(item => (
        <TouchableOpacity
          key={item.name}
          className="flex-row justify-between py-3 border-b border-neutral-800"
        >
          <Text className="text-white">{item.name}</Text>
          <Text className="text-neutral-400 text-sm">{item.role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
