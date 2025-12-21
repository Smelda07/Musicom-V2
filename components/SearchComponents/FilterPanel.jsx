import { View, Text, TouchableOpacity } from "react-native"
import InstrumentSelector from "./SelectorComponents/InstrumentSelector.jsx";

const genres = ["Rock", "Metal", "Jazz", "Pop", "Hip hop"]
const genders = ["any", "male", "female"]

export default function FiltersPanel({ filters, setFilters }) {
  const toggleArray = (key, value) => {
    setFilters(prev => {
      const arr = prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]

      return { ...prev, [key]: arr }
    })
  }

  return (
    <View className="bg-neutral-900 rounded-2xl p-4 mt-4">
      <Text className="text-white mb-2">Instrument</Text>
      <InstrumentSelector
        selectedInstruments={filters.instruments}
        onChange={(arr) => setFilters(prev => ({ ...prev, instruments: arr }))}
      />

      <Text className="text-white mt-4 mb-2">Genre</Text>

      <Text className="text-white mt-4 mb-2">Gender</Text>

    </View>
  )
}
