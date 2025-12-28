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

const { height } = Dimensions.get("window")

export default function AddPostOverlay({ open, onClose }) {
  const translateY = useRef(new Animated.Value(height)).current

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: open ? 0 : height,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [open])

  if (!open) return null

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

            <OverlayItem icon="document-text" label="Create Event" />
            <OverlayItem icon="musical-notes" label="Create a Band" />
            <OverlayItem icon="image" label="Player Request" />
            <OverlayItem icon="play" label="Create a Promo track" />
            <OverlayItem icon="cog" label="Gear collection" />

          </Animated.View>
        </TouchableWithoutFeedback>

      </View>
    </TouchableWithoutFeedback>
  )
}

const OverlayItem = ({ icon, label }) => (
  <TouchableOpacity className="flex-row items-center py-3">
    <Ionicons name={icon} size={20} color="#d2ff3fff" />
    <Text className="text-white ml-4 text-base">
      {label}
    </Text>
  </TouchableOpacity>
)
