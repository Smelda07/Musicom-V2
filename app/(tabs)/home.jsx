import { View } from "react-native";
import { useState } from "react";

import Header from "../../components/HomeScreenComponents/Header";
import FilterPills from "../../components/HomeScreenComponents/FilterPills";
import Search from "../../components/HomeScreenComponents/Search";
import Feed from "../../components/HomeScreenComponents/Feed";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const FILTERS = [
  { id: "all", label: "All" },
  { id: "events", label: "Events" },
  { id: "bands", label: "Bands" },
  { id: "musicians", label: "Musicians" },
  { id: "promotracks", label: "Promo Tracks" },
  { id: "gear", label: "Gear" },
  ];

  return (
    <View className="flex-1 bg-primary">
      <Header />

      <FilterPills
        filters={FILTERS}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <Search
        value={search}
        onChange={setSearch}
      />

      <Feed
        filter={activeFilter}
      />
    </View>
  );
};

export default Home;
