import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Card = ({ children }) => (
  <View className="mb-4 rounded-2xl bg-neutral-900 p-4">
    {children}
  </View>
);

export default function HomeFeedPreview() {
  return (
    <View className="px-4 mt-4">

      {/* ================= EVENT ================= */}
      <Card>
        <Image
          source={{ uri: "https://picsum.photos/600/300" }}
          className="h-40 w-full rounded-xl mb-3"
        />

        <Text className="text-white text-lg font-semibold">
          Underground Jam Night
        </Text>

        <Text className="text-neutral-400 text-sm mt-1">
          📍 Brno • Kabinet MÚZ
        </Text>

        <Text className="text-neutral-400 text-sm">
          🗓 12. dubna • 19:00
        </Text>

        <View className="flex-row justify-between mt-3">
          <TouchableOpacity className="rounded-full bg-neutral-800 px-4 py-2">
            <Text className="text-white">Zajímá mě</Text>
          </TouchableOpacity>

          <TouchableOpacity className="rounded-full bg-[#ffaf00] px-4 py-2">
            <Text className="text-black font-semibold">Jdu</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* ================= BAND ================= */}
      <Card>
        <Text className="text-white text-lg font-semibold">
          Black Signal
        </Text>

        <Text className="text-neutral-400 text-sm mt-1">
          Alternative / Rock • Praha
        </Text>

        <View className="flex-row gap-2 mt-2">
          {["Rock", "Alt", "Indie"].map((g) => (
            <View key={g} className="rounded-full bg-neutral-800 px-3 py-1">
              <Text className="text-xs text-white">{g}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity className="mt-3 self-start rounded-full bg-neutral-800 px-4 py-2">
          <Text className="text-white">Zobrazit profil</Text>
        </TouchableOpacity>
      </Card>

      {/* ================= MUSICIAN ================= */}
      <Card>
        <Text className="text-white text-lg font-semibold">
          Tomáš Novák
        </Text>

        <Text className="text-neutral-400 text-sm mt-1">
          🎸 Kytara • Bass
        </Text>

        <Text className="text-neutral-400 text-sm">
          Hledá kapelu • Funk / Jazz
        </Text>

        <View className="flex-row gap-2 mt-3">
          <TouchableOpacity className="rounded-full bg-neutral-800 px-4 py-2">
            <Text className="text-white">Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity className="rounded-full bg-yellow-400 px-4 py-2">
            <Text className="text-black font-semibold">Kontaktovat</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* ================= PROMO TRACK ================= */}
      <Card>
        <Text className="text-white text-lg font-semibold">
          Midnight Drive
        </Text>

        <Text className="text-neutral-400 text-sm mt-1">
          Synthwave • 3:42
        </Text>

        <View className="mt-3 flex-row items-center justify-between">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Ionicons name="play-circle" size={36} color="#FFD54F" />
            <Text className="text-white">Přehrát</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </Card>

      {/* ================= GEAR ================= */}
      <Card>
        <Image
          source={{ uri: "https://picsum.photos/600/400" }}
          className="h-40 w-full rounded-xl mb-3"
        />

        <Text className="text-white text-lg font-semibold">
          Fender Jazz Bass
        </Text>

        <Text className="text-neutral-400 text-sm">
          Použitý • Praha
        </Text>

        <Text className="text-yellow-400 text-lg font-semibold mt-2">
          18 000 Kč
        </Text>

        <TouchableOpacity className="mt-3 self-start rounded-full bg-neutral-800 px-4 py-2">
          <Text className="text-white">Kontaktovat</Text>
        </TouchableOpacity>
      </Card>

    </View>
  );
}
