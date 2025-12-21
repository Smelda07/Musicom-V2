import { View, Text, TouchableOpacity } from "react-native"

export default function FilterChips({ filters, setFilters }) {
  const chips = []

  filters.instruments.forEach(i => chips.push({ key: i, type: "instrument" }))
  filters.genres.forEach(g => chips.push({ key: g, type: "genre" }))
  if (filters.location) chips.push({ key: filters.location, type: "location" })
  if (filters.gender !== "any") chips.push({ key: filters.gender, type: "gender" })

  if (!chips.length) return null

  const removeChip = (chip) => {
    setFilters(prev => {
      const updated = { ...prev }

      if (chip.type === "instrument") {
        updated.instruments = prev.instruments.filter(i => i !== chip.key)
      }
      if (chip.type === "genre") {
        updated.genres = prev.genres.filter(g => g !== chip.key)
      }
      if (chip.type === "location") {
        updated.location = ""
      }
      if (chip.type === "gender") {
        updated.gender = "any"
      }

      return updated
    })
  }

  return (
    <View className="flex-row flex-wrap mt-3">
      {chips.map(chip => (
        <TouchableOpacity
          key={`${chip.type}-${chip.key}`}
          onPress={() => removeChip(chip)}
          className="bg-emerald-600 rounded-full px-3 py-1 mr-2 mb-2"
        >
          <Text className="text-black text-xs">
            {chip.key} ✕
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
