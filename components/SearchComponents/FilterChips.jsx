import { View, Text, TouchableOpacity } from "react-native";

export default function FilterChips({ filters, setFilters }) {
  const chips = [];

  // Přidej instrumenty
  filters.instruments.forEach(i => chips.push({ key: i, type: "instrument" }));

  // Přidej žánry
  filters.genres.forEach(g => chips.push({ key: g, type: "genre" }));

  // Přidej lokace jako string "Country, State, City"
  if (filters.location) {
    const locLabels = [
      filters.location.country?.label,
      filters.location.state?.label,
      filters.location.city?.label
    ].filter(Boolean).join(", "); // odstraní null a spojí čárkou
    chips.push({ key: locLabels, type: "location" });
  }

  // Přidej gender
  if (filters.gender !== "any") chips.push({ key: filters.gender, type: "gender" });

  if (!chips.length) return null;

  const removeChip = (chip) => {
    setFilters(prev => {
      const updated = { ...prev };

      if (chip.type === "instrument") {
        updated.instruments = prev.instruments.filter(i => i !== chip.key);
      }
      if (chip.type === "genre") {
        updated.genres = prev.genres.filter(g => g !== chip.key);
      }
      if (chip.type === "location") {
        updated.location = null; // reset lokace
      }
      if (chip.type === "gender") {
        updated.gender = "any";
      }

      return updated;
    });
  };
}
