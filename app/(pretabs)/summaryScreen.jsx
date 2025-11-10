import { useSurveyStore } from "../../context/useSurveyStore";
import { Text, View, ScrollView } from "react-native";
import { Music, MapPin, User, Star, Building, Calendar } from "lucide-react-native";

const SummaryScreen = () => {
  const {
    role,
    chosenInstruments,
    chosenGenres,
    chosenGender,
    birthYear,
    locality,
    organizationName,
    chosenEvents,
  } = useSurveyStore();

  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - parseInt(birthYear) : null;

  const Card = ({ title, Icon, children }) => (
  <View className="bg-zinc-800/70 p-4 rounded-2xl mt-4 border border-zinc-700">
    <View className="flex-row items-center justify-between mb-2 w-full">
      <Text className="text-white text-lg font-semibold">{title}</Text>
        {Icon && <Icon size={20} color="#d2ff3fff" />}
      </View>
      <View className="mt-1">
        {children}
      </View>
    </View>
  );


  return (
    <ScrollView className="bg-primary p-4 h-full">

      <Text className="text-[#daff62ff] text-2xl font-bold mt-2 text-center">
        Summary
      </Text>
      <Text className="text-white text-sm mb-4 opacity-80 text-center">
        Review your answers before continuing
      </Text>

      {/* ROLE */}
      <Card title="Your Role" Icon={User}>
        <Text className="text-[#daff62ff] capitalize">{role}</Text>
      </Card>

      {/* MUSICIAN */}
      {role === "musician" && (
        <>
          <Card title="Instruments" Icon={Music}>
            {chosenInstruments.length > 0 ? (
              chosenInstruments.map((instrument, i) => (
                <Text key={i} className="text-[#daff62ff]">
                  {instrument}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400">No instruments selected</Text>
            )}
          </Card>

          <Card title="Favorite Genres" Icon={Star}>
            {chosenGenres.length > 0 ? (
              chosenGenres.map((genre, i) => (
                <Text key={i} className="text-[#daff62ff]">
                  {String(genre)}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400">No genres selected</Text>
            )}
          </Card>

          <Card title="Location" Icon={MapPin}>
            <Text className="text-[#daff62ff] mb-2">{locality.country?.label || "—"}</Text>
            <Text className="text-[#daff62ff] mb-2">{locality.state?.label || "—"}</Text>
            <Text className="text-[#daff62ff]">{locality.city?.label || "—"}</Text>
          </Card>

          <Card title="Gender" Icon={User}>
            <Text className="text-[#daff62ff]">
              {chosenGender || "Not selected"}
            </Text>
          </Card>

          <Card title="Age" Icon={Calendar}>
            <Text className="text-[#daff62ff]">
              {birthYear ? `${age} years old` : "Not provided"}
            </Text>
          </Card>
        </>
      )}

      {/* ORGANIZER */}
      {role === "organizer" && (
        <>
          <Card title="Organization" Icon={Building}>
            <Text className="text-[#daff62ff]">{organizationName || "Not provided"}</Text>
          </Card>

          <Card title="Event Types" Icon={Calendar}>
            {chosenEvents?.length > 0 ? (
              chosenEvents.map((ev, i) => (
                <Text key={i} className="text-[#daff62ff]">
                  {String(ev)}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400">No events selected</Text>
            )}
          </Card>

          <Card title="Preferred Genres" Icon={Star}>
            {chosenGenres?.length > 0 ? (
              chosenGenres.map((genre, i) => (
                <Text key={i} className="text-[#daff62ff]">
                  {String(genre)}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400">No genres selected</Text>
            )}
          </Card>

          <Card title="Location" Icon={MapPin}>
            <Text className="text-[#daff62ff] mb-2">{locality.country?.label || "—"}</Text>
            <Text className="text-[#daff62ff] mb-2">{locality.state?.label || "—"}</Text>
            <Text className="text-[#daff62ff]">{locality.city?.label || "—"}</Text>
          </Card>
        </>
      )}

      {/* FAN */}
      {role === "fan" && (
        <>
          <Card title="Favorite Genres" Icon={Star}>
            {chosenGenres.length > 0 ? (
              chosenGenres.map((genre, i) => (
                <Text key={i} className="text-[#daff62ff]">
                  {String(genre)}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400">No genres selected</Text>
            )}
          </Card>

          <Card title="Location" Icon={MapPin}>
            <Text className="text-[#daff62ff] mb-2">{locality.country?.label || "—"}</Text>
            <Text className="text-[#daff62ff] mb-2">{locality.state?.label || "—"}</Text>
            <Text className="text-[#daff62ff]">{locality.city?.label || "—"}</Text>
          </Card>
        </>
      )}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default SummaryScreen;
