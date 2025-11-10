import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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

  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${API_BASE}/countries`);
        const data = await res.json();
        const list = Object.entries(data.content.countries || {}).map(([key, label]) => ({
          label,
          value: key,
        }));
        setCountries(list);
      } catch (e) {
        console.log("Error loading countries", e);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }
    const fetchStates = async () => {
      try {
        const res = await fetch(`${API_BASE}/countries/${selectedCountry}`);
        const data = await res.json();
        const list = Object.entries(data.content.states || {}).map(([key, label]) => ({
          label,
          value: key,
        }));
        setStates(list);
      } catch (e) {
        console.log("Error loading states", e);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      try {
        const res = await fetch(`${API_BASE}/countries/${selectedCountry}/${selectedState}`);
        const data = await res.json();
        const list = Object.entries(data.content.cities || {}).map(([key, label]) => ({
          label,
          value: key,
        }));
        setCities(list);
      } catch (e) {
        console.log("Error loading cities", e);
      }
    };
    fetchCities();
  }, [selectedState]);

  /** --- společné styly --- **/
  const pickerBaseStyle = {
    backgroundColor: "#222222ff",
    borderColor: "#565555ff",
    borderWidth: 1,
    borderRadius: 8,
  };

  const pickerModalCommon = {
    modalContentContainerStyle: { backgroundColor: "#1C1C1E" },
    modalTitleStyle: { color: "#fff" },
    searchContainerStyle: {
      borderBottomColor: "#565656ff",
      borderBottomWidth: 1,
    },
    searchTextInputContainerStyle: {
      borderColor: "#A1A1AA",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "#2C2C2E",
      marginBottom: 14,
    },
    searchTextInputStyle: {
      color: "#fff",
      backgroundColor: "#2C2C2E",
      height: 36,
      borderColor: "#5d5d5dff",
      borderWidth: 1.2,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    listItemContainerStyle: {
      backgroundColor: "#1C1C1E",
      borderBottomColor: "#3A3A3C",
      borderBottomWidth: 1,
    },
    listItemLabelStyle: { color: "#fff" },
    dividerStyle: { backgroundColor: "#3A3A3C" },
    closeIconStyle: { tintColor: "#A1A1AA" },
  };

  return (
    <View className="flex-1 bg-primary p-4">
      <Text className="text-white text-lg mt-2 mb-4 font-medium">Select location</Text>

      {/* COUNTRY */}
      <View className="mb-3 z-[3000]">
        <DropDownPicker
          open={openCountry}
          value={selectedCountry}
          items={countries}
          setOpen={(val) => {
            setOpenCountry(val);
            if (val) {
              setOpenState(false);
              setOpenCity(false);
            }
          }}
          setValue={(callback) => {
            const val = typeof callback === "function" ? callback() : callback;
            setSelectedCountry(val || null);
            setSelectedState(null);
            setSelectedCity(null);
            const label = countries.find((c) => c.value === val)?.label || "";
            setLocality(val || "", label, "", "", "", "");
          }}
          placeholder="Select a country"
          searchable={true}
          listMode="MODAL"
          modalTitle="Select country"
          modalProps={{ animationType: "slide" }}
          style={pickerBaseStyle}
          dropDownContainerStyle={pickerBaseStyle}
          placeholderStyle={{ color: "#A0A0A0" }}
          textStyle={{ color: "#fff" }}
          
          {...pickerModalCommon}
        />
      </View>

      {/* STATE */}
      {selectedCountry && (
        <View className="mb-3 z-[2000]">
          <DropDownPicker
            open={openState}
            value={selectedState}
            items={states}
            setOpen={(val) => {
              setOpenState(val);
              if (val) {
                setOpenCountry(false);
                setOpenCity(false);
              }
            }}
            setValue={(callback) => {
              const val = typeof callback === "function" ? callback() : callback;
              setSelectedState(val || null);
              setSelectedCity(null);
              const label = states.find((s) => s.value === val)?.label || "";
              setLocality(
                selectedCountry || "",
                countries.find((c) => c.value === selectedCountry)?.label || "",
                val || "",
                label,
                "",
                ""
              );
            }}
            placeholder="Select a state"
            searchable={true}
            listMode="MODAL"
            modalTitle="Select state"
            style={pickerBaseStyle}
            dropDownContainerStyle={pickerBaseStyle}
            placeholderStyle={{ color: "#A0A0A0" }}
            textStyle={{ color: "#fff" }}
            {...pickerModalCommon}
          />
        </View>
      )}

      {/* CITY */}
      {selectedState && (
        <View className="mb-3 z-[1000]">
          <DropDownPicker
            open={openCity}
            value={selectedCity}
            items={cities}
            setOpen={(val) => {
              setOpenCity(val);
              if (val) {
                setOpenCountry(false);
                setOpenState(false);
              }
            }}
            setValue={(callback) => {
              const val = typeof callback === "function" ? callback() : callback;
              setSelectedCity(val || null);
              const label = cities.find((c) => c.value === val)?.label || "";
              setLocality(
                selectedCountry || "",
                countries.find((c) => c.value === selectedCountry)?.label || "",
                selectedState || "",
                states.find((s) => s.value === selectedState)?.label || "",
                val || "",
                label
              );
            }}
            placeholder="Select a city"
            searchable={true}
            listMode="MODAL"
            modalTitle="Select city"
            style={pickerBaseStyle}
            dropDownContainerStyle={pickerBaseStyle}
            placeholderStyle={{ color: "#A0A0A0" }}
            textStyle={{ color: "#fff" }}
            {...pickerModalCommon}
          />
        </View>
      )}
    </View>
  );
};

export default OnBoardingLocality;
