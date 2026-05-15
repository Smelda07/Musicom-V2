import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native"
import { useEffect, useRef } from "react"
import { Ionicons } from "@expo/vector-icons"
import { router } from 'expo-router';

const { height } = Dimensions.get("window")

export default function AddPostOverlay({ open, onClose, onSelect }) {
  const translateY = useRef(new Animated.Value(height)).current

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: open ? 0 : height,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [open])

  if (!open) return null

  const handleSelect = (type) => {
    if (type === "event") {
      router.push("(subpages)/add/EventPage")
    }
    if (type === "band") {
      router.push("(subpages)/add/BandPage")
    }
    onClose()
    onSelect?.(type)
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="absolute inset-0 bg-black/60 justify-end">
        <TouchableWithoutFeedback>
          <Animated.View
            style={{ transform: [{ translateY }] }}
            className="bg-neutral-900 rounded-t-3xl px-6 pt-4 pb-14"
          >
            <View className="w-12 h-1 bg-neutral-600 rounded-full self-center mb-6" />

            <Text className="text-white text-lg font-semibold mb-4">
              Add new post
            </Text>

            <OverlayItem
              icon="calendar"
              label="Create Event"
              onPress={() => handleSelect("event")}
            />
            <OverlayItem
              icon="people"
              label="Create a Band"
              onPress={() => handleSelect("band")}
            />
            <OverlayItem
              icon="musical-notes"
              label="Musician Profile"
              onPress={() => handleSelect("musician")}
            />
            <OverlayItem
              icon="play"
              label="Promo Track"
              onPress={() => handleSelect("promo")}
            />
            <OverlayItem
              icon="cog"
              label="Gear"
              onPress={() => handleSelect("gear")}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const OverlayItem = ({ icon, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-3"
  >
    <Ionicons name={icon} size={20} color="#d2ff3f" />
    <Text className="text-white ml-4 text-base">
      {label}
    </Text>
  </TouchableOpacity>
)
