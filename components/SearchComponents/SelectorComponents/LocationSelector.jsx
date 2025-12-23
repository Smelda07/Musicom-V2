import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";

const API_BASE = "https://api.turyna.eu/api/musicom";

export default function LocationSelector({ value, onChange }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  /* --- fetch countries --- */
  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then(res => res.json())
      .then(data => {
        const list = Object.entries(data.content.countries || {})
          .map(([key, label]) => ({ key, label }));
        setCountries(list);
      });
  }, []);

  /* --- fetch states --- */
  useEffect(() => {
    if (!value?.country?.key) return setStates([]);

    fetch(`${API_BASE}/countries/${value.country.key}`)
      .then(res => res.json())
      .then(data => {
        const list = Object.entries(data.content.states || {})
          .map(([key, label]) => ({ key, label }));
        setStates(list);
      });
  }, [value?.country?.key]);

  /* --- fetch cities --- */
  useEffect(() => {
    if (!value?.country?.key || !value?.state?.key) return setCities([]);

    fetch(`${API_BASE}/countries/${value.country.key}/${value.state.key}`)
      .then(res => res.json())
      .then(data => {
        const list = Object.entries(data.content.cities || {})
          .map(([key, label]) => ({ key, label }));
        setCities(list);
      });
  }, [value?.state?.key]);

  const renderList = (data, onSelect) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      style={{ maxHeight: 160 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="px-3 py-2 border-b border-gray-700"
          onPress={() => onSelect(item)}
        >
          <Text className="text-white">{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View className="mt-2">
      <Text className="text-white mb-1">Country</Text>
      <TextInput
        className="border border-gray-600 rounded-md px-3 py-2 text-white"
        placeholder="Search country..."
        placeholderTextColor="#888"
        value={countrySearch}
        onChangeText={setCountrySearch}
      />

      {countrySearch.length > 0 &&
        renderList(
          countries.filter(c =>
            c.label.toLowerCase().includes(countrySearch.toLowerCase())
          ),
          (item) => {
            onChange({ country: item, state: null, city: null });
            setCountrySearch(item.label);
            setStateSearch("");
            setCitySearch("");
          }
        )
      }

      {value?.country && (
        <>
          <Text className="text-white mt-3 mb-1">State</Text>
          <TextInput
            className="border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Search state..."
            placeholderTextColor="#888"
            value={stateSearch}
            onChangeText={setStateSearch}
          />

          {stateSearch.length > 0 &&
            renderList(
              states.filter(s =>
                s.label.toLowerCase().includes(stateSearch.toLowerCase())
              ),
              (item) => {
                onChange({ ...value, state: item, city: null });
                setStateSearch(item.label);
                setCitySearch("");
              }
            )
          }
        </>
      )}

      {value?.state && (
        <>
          <Text className="text-white mt-3 mb-1">City</Text>
          <TextInput
            className="border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Search city..."
            placeholderTextColor="#888"
            value={citySearch}
            onChangeText={setCitySearch}
          />

          {citySearch.length > 0 &&
            renderList(
              cities.filter(c =>
                c.label.toLowerCase().includes(citySearch.toLowerCase())
              ),
              (item) => {
                onChange({ ...value, city: item });
                setCitySearch(item.label);
              }
            )
          }
        </>
      )}
    </View>
  );
}
