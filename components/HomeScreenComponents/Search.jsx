import { View, TextInput } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"

const HomeSearch = ({ value, onChange }) => {
  return (
    <View className="mx-4 mb-2 flex-row items-center rounded-full bg-neutral-900 px-5 py-1">
      <MagnifyingGlassIcon size={20} color="#c8cfdbff"/>
      <TextInput
        className="ml-2 flex-1 text-white"
        placeholder="Hledej kapely, akce, hudebníky..."
        placeholderTextColor="#838a98ff"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default HomeSearch;
