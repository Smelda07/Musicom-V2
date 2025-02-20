import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSurveyStore } from "../../context/useSurveyStore";

const OnBoardingGender = () => {
  const { chosenGender, setGender } = useSurveyStore(); // Používáme state management

  return (
    <ScrollView className="bg-primary">
      <View className="flex-wrap gap-y-3 mt-5 mx-auto">
        {/* Male Button */}
        <TouchableOpacity
          className={`rounded-full px-10 py-2 w-auto ${
            chosenGender === "Male" ? "bg-[#005648]" : "bg-[#00947D]"
          }`}
          onPress={() => setGender("Male")} // Uložíme do state
        >
          <Text className="text-white font-semibold text-center text-lg">
            Male
          </Text>
        </TouchableOpacity>

        {/* Female Button */}
        <TouchableOpacity
          className={`rounded-full px-10 py-2 w-auto mt-3 ${
            chosenGender === "Female" ? "bg-[#005648]" : "bg-[#00947D]"
          }`}
          onPress={() => setGender("Female")} // Uložíme do state
        >
          <Text className="text-white font-semibold text-center text-lg">
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OnBoardingGender;
