import { View, TextInput, TouchableOpacity } from "react-native"
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline"

export default function SearchBar({ value, onChange, onFilterPress }) {
  return (
    <View className="flex-row items-center bg-neutral-900 rounded-2xl px-4 py-2">
      <MagnifyingGlassIcon size={20} color="#c8cfdbff"/>

      <TextInput
        className="flex-1 ml-3 text-white"
        placeholder="Search musicians, instruments, genre..."
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChange}
      />

      <TouchableOpacity onPress={onFilterPress}>
        <AdjustmentsHorizontalIcon size={20} color="#00ffaaff" />
      </TouchableOpacity>
    </View>
  )
}
