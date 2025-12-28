import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <Text className="text-white text-3xl font-semibold">
        Musicom
      </Text>

      <View className="flex-row gap-5">
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
