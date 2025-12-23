import { View, FlatList} from 'react-native'
import { useState, useMemo } from "react"
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchBar from "../../components/SearchComponents/SearchBar"
import FiltersPanel from "../../components/SearchComponents/FilterPanel"
import FilterChips from "../../components/SearchComponents/FilterChips"
import ProfileCard from "../../components/SearchComponents/ProfileCard"

import { mockProfiles } from "../../constants/mockProfiles"

export default function SearchScreen() {
  const [query, setQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useState({
    instruments: [],
    genres: [],
    location: "",
    ageRange: [],
    gender: "any",
  })

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      // TEXT SEARCH (name, instrument, genre, location)
      const q = query.toLowerCase()
      const textMatch =
        profile.name.toLowerCase().includes(q) ||
        profile.instrument.toLowerCase().includes(q) ||
        profile.genres.join(" ").toLowerCase().includes(q) ||
        profile.location.toLowerCase().includes(q)

      if (query && !textMatch) return false

      // INSTRUMENT FILTER
      if (
        filters.instruments.length &&
        !filters.instruments.includes(profile.instrument)
      ) {
        return false
      }

      // GENRE FILTER
      if (
        filters.genres.length &&
        !filters.genres.some(g => profile.genres.includes(g))
      ) {
        return false
      }

      // LOCATION
      if (
        filters.location &&
        profile.location !== filters.location
      ) {
        return false
      }

      // AGE
      if (
        profile.age < filters.ageRange[0] ||
        profile.age > filters.ageRange[1]
      ) {
        return false
      }

      // GENDER
      if (
        filters.gender !== "any" &&
        profile.gender !== filters.gender
      ) {
        return false
      }

      return true
    })
  }, [query, filters])

  return (
    <SafeAreaView className="bg-secondary h-full">
      <View className="flex-1 px-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onFilterPress={() => setFiltersOpen(!filtersOpen)}
        />

        <FilterChips filters={filters} setFilters={setFilters} />

        {filtersOpen && (
          <FiltersPanel filters={filters} setFilters={setFilters} />
        )}

        <FlatList
          data={filteredProfiles}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProfileCard profile={item} query={query} />
          )}
          className="mt-4"
        />
      </View>
    </SafeAreaView>
  )
}