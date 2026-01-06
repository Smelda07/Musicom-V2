import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import AddPostOverlay from "../../components/AddPostComponents/AddPostOverlay"

export default function Add({ onSelect }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Ionicons name="add-circle" size={28} color="#d2ff3f" />
      </TouchableOpacity>

      <AddPostOverlay
        open={open}
        onClose={() => setOpen(false)}
        onSelect={onSelect}
      />
    </>
  )
}
