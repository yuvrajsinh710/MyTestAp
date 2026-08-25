import { faker } from "@faker-js/faker";
import { FlatList, StyleSheet, View } from "react-native";

import Header from "@/components/Header";
import ListingCard from "@/components/ListingCard";
import { useAppTheme } from "@/context/ThemeContext";

const listingData = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  location: `${faker.location.city()}, ${faker.location.country()}`,
}));

export default function ListingScreen() {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Header title="Listing" />

      <FlatList
        data={listingData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingBottom: 24,
  },
});
