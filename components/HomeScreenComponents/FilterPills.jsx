import { ScrollView, TouchableOpacity, Text, View } from "react-native";

const FilterPills = ({ filters, active, onChange }) => {
  return (
    <View style={{ height: 70 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, alignItems: "center" }}
      >
        {filters.map((filter) => {
          const isActive = active === filter.id;

          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() => onChange(filter.id)}
              style={{
                marginRight: 8,
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 10,
                backgroundColor: isActive ? "#00ffaaff" : "#252424ff",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? "600" : "400",
                  color: isActive ? "black" : "white",
                }}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FilterPills;
