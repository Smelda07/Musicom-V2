import { useSurveyStore } from "../../context/useSurveyStore";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

const SummaryScreen = () => {
  const { chosenInstruments, chosenGenres } = useSurveyStore();

  return (
    <ScrollView className="bg-primary p-4">
      <Text className="text-white text-lg font-bold">Your Selected Instruments:</Text>
      {chosenInstruments.length > 0 ? (
        chosenInstruments.map((instrument, index) => (
          <Text key={index} className="text-[#A7FFEF]">
            {instrument}
          </Text>
        ))
      ) : (
        <Text className="text-gray-400">No instruments selected</Text>
      )}

      <Text className="text-white text-lg font-bold mt-4">Your Selected Genres:</Text>
      {chosenGenres.length > 0 ? (
        chosenGenres.map((genre, index) => (
          <Text key={index} className="text-[#A7FFEF]">
            {String(genre)}
          </Text>
        ))
      ) : (
        <Text className="text-gray-400">No genres selected</Text>
      )}
    </ScrollView>
  );
};

export default SummaryScreen;
