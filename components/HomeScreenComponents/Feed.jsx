import { View, Text } from "react-native";

const Feed = ({ filter }) => {
  return (
    <View className="flex-1 px-4 mt-4">
      <Text className="text-neutral-400">
        Feed – filtr: {filter}
      </Text>
    </View>
  );
};

export default Feed;
