import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSurveyStore } from "../../context/useSurveyStore";

const API_BASE = "https://api.turyna.eu/api/musicom";

const OnBoardingLocality = () => {
  const { locality, setLocality } = useSurveyStore();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(locality.country?.key || null);
  const [selectedState, setSelectedState] = useState(locality.state?.key || null);
  const [selectedCity, setSelectedCity] = useState(locality.city?.key || null);

  // Načtení seznamu zemí
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_BASE}/countries`);
        const data = await response.json();
        setCountries(data.content.countries || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Načtení seznamu států při změně země
  useEffect(() => {
    if (!selectedCountry) return;
    const fetchStates = async () => {
      try {
        const data = await fetch(`${API_BASE}/countries/${selectedCountry}`).then(res => res.json());
        setStates(data.content.states || []);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  // Načtení seznamu měst při změně státu
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;
    const fetchCities = async () => {
      try {
        const data = await fetch(`${API_BASE}/countries/${selectedCountry}/${selectedState}`).then(res => res.json());
        setCities(data.content.cities || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedState]);

  // Změna země → reset státu a města
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setSelectedCity(null);

    const countryLabel = countries[value] || "";
    setLocality(value, countryLabel, "", "", "", "");
  };

  // Změna státu → reset města
  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedCity(null);

    const stateLabel = states[value] || "";
    setLocality(selectedCountry, countries[selectedCountry], value, stateLabel, "", "");
  };

  // Změna města
  const handleCityChange = (value) => {
    setSelectedCity(value);

    const cityLabel = cities[value] || "";
    setLocality(selectedCountry, countries[selectedCountry], selectedState, states[selectedState], value, cityLabel);
  };

  return (
    <ScrollView className="bg-primary">
      <View className="mx-4">
        <Text className="text-lg text-white mt-6">Select location</Text>

        {/* Výběr země */}
        <View className="mt-4 bg-white rounded-md">
          <Picker selectedValue={selectedCountry} onValueChange={handleCountryChange}>
            <Picker.Item label="Select a country" value="" />
            {Object.entries(countries).map(([key, label]) => (
              <Picker.Item key={key} label={label} value={key} />
            ))}
          </Picker>
        </View>

        {/* Výběr státu */}
        {selectedCountry && (
          <View className="mt-4 bg-white rounded-md">
            <Picker selectedValue={selectedState} onValueChange={handleStateChange}>
              <Picker.Item label="Select a state" value="" />
              {Object.entries(states).map(([key, label]) => (
                <Picker.Item key={key} label={label} value={key} />
              ))}
            </Picker>
          </View>
        )}

        {/* Výběr města */}
        {selectedState && (
          <View className="mt-4 bg-white rounded-md">
            <Picker selectedValue={selectedCity} onValueChange={handleCityChange}>
              <Picker.Item label="Select a city" value="" />
              {Object.entries(cities).map(([key, label]) => (
                <Picker.Item key={key} label={label} value={key} />
              ))}
            </Picker>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OnBoardingLocality;
