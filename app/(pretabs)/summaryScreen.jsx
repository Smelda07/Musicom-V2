import { useSurveyStore } from "../../context/useSurveyStore";
import { Text, View, ScrollView } from "react-native";

const SummaryScreen = () => {
  const { chosenInstruments, chosenGenres, chosenGender, birthYear, locality } = useSurveyStore();
  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - parseInt(birthYear) : null;
  

  return (
    <ScrollView className="bg-primary p-4">
      <Text className="text-white text-lg font-bold">Your Selected Instruments:</Text>
      {chosenInstruments.length > 0 ? (
        chosenInstruments.map((instrument, index) => (
          <Text key={index} className="text-[#A7FFEF]">{instrument}</Text>
        ))
      ) : (
        <Text className="text-gray-400">No instruments selected</Text>
      )}

      <Text className="text-white text-lg font-bold mt-4">Your Selected Genres:</Text>
      {chosenGenres.length > 0 ? (
        chosenGenres.map((genre, index) => (
          <Text key={index} className="text-[#A7FFEF]">{String(genre)}</Text>
        ))
      ) : (
        <Text className="text-gray-400">No genres selected</Text>
      )}
      <Text className="text-white text-lg font-bold mt-4">Your Selected Locality:</Text>
      <Text className="text-[#A7FFEF]">{locality.country.label}</Text>
      <Text className="text-[#A7FFEF]">{locality.state.label}</Text>
      <Text className="text-[#A7FFEF]">{locality.city.label}</Text>



      <Text className="text-white text-lg font-bold mt-4">Your Selected Gender:</Text>
      <Text className="text-[#A7FFEF]">{chosenGender || "Not selected"}</Text>

      <Text className="text-white text-lg font-bold mt-4">Your Age:</Text>
      <Text className="text-[#A7FFEF]">{birthYear ? `${age} years old` : "Not provided"}</Text>
    </ScrollView>
  );
};

export default SummaryScreen;
