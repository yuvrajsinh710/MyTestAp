import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

type ListingItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
};

type ListingCardProps = {
  item: ListingItem;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function ListingCard({ item }: ListingCardProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
        <Text style={[styles.avatarText, { color: colors.primary }]}>
          {getInitials(item.name)}
        </Text>
      </View>

      <View style={styles.details}>
        <Text
          style={[styles.name, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={[styles.detail, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {item.email}
        </Text>

        <Text
          style={[styles.detail, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {item.phone}
        </Text>

        <Text
          style={[styles.detail, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {item.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#0B1526",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "800",
  },
  details: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  detail: {
    fontSize: 13.5,
  },
});
