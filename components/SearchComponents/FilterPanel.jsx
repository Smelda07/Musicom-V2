import { View, Text, TouchableOpacity } from "react-native"
import InstrumentSelector from "./SelectorComponents/InstrumentSelector.jsx";
import GenreSelector from "./SelectorComponents/GenreSelector.jsx"
import LocationSelector from "./SelectorComponents/LocationSelector.jsx"

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

      {/* Instrument Selector */}
      <Text className="text-white mb-2">Instrument</Text>
      <InstrumentSelector
        selectedInstruments={filters.instruments}
        onChange={(arr) => setFilters(prev => ({ ...prev, instruments: arr }))}
      />

      {/* Genre Selector */}
      <Text className="text-white mb-2">Genre</Text>
      <GenreSelector
        selectedGenres={filters.genres}
        onChange={(arr) => setFilters(prev => ({ ...prev, genres: arr }))}
      />

      {/* Location Selector */}
      <LocationSelector
        value={filters.location}
        onChange={(loc) =>
          setFilters(prev => ({ ...prev, location: loc }))
        }
      />

      {/* Zobrazení vybrané lokace */}
      <View className="flex-row flex-wrap mt-2">
        {filters.location?.country?.label && (
          <View className="px-2 py-1 bg-gray-700 rounded mr-2 mb-2">
            <Text className="text-white text-xs">
              {filters.location.country.label}
            </Text>
          </View>
        )}

        {filters.location?.state?.label && (
          <View className="px-2 py-1 bg-gray-600 rounded mr-2 mb-2">
            <Text className="text-white text-xs">
              {filters.location.state.label}
            </Text>
          </View>
        )}

        {filters.location?.city?.label && (
          <View className="px-2 py-1 bg-gray-500 rounded mr-2 mb-2">
            <Text className="text-white text-xs">
              {filters.location.city.label}
            </Text>
          </View>
        )}
      </View>

      {/* Gender Selector */}
      <Text className="text-white mb-2 mt-4">Gender</Text>
      <View className="flex-row">
        {genders.map(g => (
          <TouchableOpacity
            key={g}
            onPress={() => setFilters(prev => ({ ...prev, gender: g }))}
            className={`px-3 py-1 mr-2 rounded-full ${
              filters.gender === g
                ? "bg-emerald-500"
                : "bg-neutral-800"
            }`}
          >
            <Text className="text-white text-xs">{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  )
}
