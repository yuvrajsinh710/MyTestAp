import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import Header from "@/components/Header";
import { useAppTheme } from "@/context/ThemeContext";

// country.flag from the picker library is an image reference, not an
// emoji — build the flag emoji from the ISO country code instead.
function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

// Format a Date as yyyy-mm-dd in local time. toISOString() converts to UTC,
// which shifts the day back one for timezones ahead of UTC (e.g. IST).
function toDateInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

type FieldErrors = {
  name?: string;
  email?: string;
  birthdate?: string;
};

export default function SettingsScreen() {
  const { colors } = useAppTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [countryName, setCountryName] = useState("India");
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const clearError = (field: keyof FieldErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  // Birthdate picker (native)
  const handleDateChange = (_event: unknown, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setBirthdate(selectedDate);
      clearError("birthdate");
    }
  };

  // Country picker
  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountryName(String(country.name));

    setShowCountryPicker(false);
  };

  // Save button
  const handleSubmit = () => {
    if (saving) {
      return;
    }

    const nextErrors: FieldErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!email.includes("@")) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!birthdate) {
      nextErrors.birthdate = "Please select your birthdate.";
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    // There is no backend here — the short delay gives the button visible
    // saving feedback before the success banner appears.
    setSaved(false);
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      setTimeout(() => setSaved(false), 3000);
    }, 900);
  };

  const inputStyle = (hasError: boolean) => [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.backgroundElement,
      borderColor: hasError ? colors.danger : colors.border,
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* Header */}
      <Header title="Settings" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Personal Information
        </Text>

        <Text
          style={[
            styles.sectionSubtitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Tell us a bit about yourself.
        </Text>

        {/* Name */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.text }]}>Name</Text>

          <TextInput
            value={name}
            onChangeText={(value) => {
              setName(value);
              clearError("name");
            }}
            placeholder="Enter your name"
            placeholderTextColor={colors.textSecondary}
            style={inputStyle(!!errors.name)}
          />

          {errors.name && (
            <Text style={[styles.errorText, { color: colors.danger }]}>
              {errors.name}
            </Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.text }]}>
            Email Address
          </Text>

          <TextInput
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              clearError("email");
            }}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            style={inputStyle(!!errors.email)}
          />

          {errors.email && (
            <Text style={[styles.errorText, { color: colors.danger }]}>
              {errors.email}
            </Text>
          )}
        </View>

        {/* Birthdate */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.text }]}>Birthdate</Text>

          {Platform.OS === "web" ? (
            // The native date picker has no web implementation, so use the
            // browser's built-in date input there.
            <input
              type="date"
              max={toDateInputValue(new Date())}
              value={birthdate ? toDateInputValue(birthdate) : ""}
              onChange={(event) => {
                const value = event.target.value;
                setBirthdate(value ? new Date(`${value}T00:00:00`) : null);
                clearError("birthdate");
              }}
              style={{
                height: 50,
                borderRadius: 12,
                border: `1px solid ${errors.birthdate ? colors.danger : colors.border}`,
                backgroundColor: colors.backgroundElement,
                color: colors.text,
                padding: "0 16px",
                fontSize: 15,
                fontFamily: "inherit",
              }}
            />
          ) : (
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={inputStyle(!!errors.birthdate)}
            >
              <Text
                style={{
                  color: birthdate ? colors.text : colors.textSecondary,
                }}
              >
                {birthdate
                  ? birthdate.toLocaleDateString()
                  : "Select your birthdate"}
              </Text>
            </Pressable>
          )}

          {errors.birthdate && (
            <Text style={[styles.errorText, { color: colors.danger }]}>
              {errors.birthdate}
            </Text>
          )}
        </View>

        {/* Date Picker (native) */}
        {Platform.OS !== "web" && showDatePicker && (
          <DateTimePicker
            value={birthdate ?? new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        {/* Country */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.text }]}>Country</Text>

          <Pressable
            onPress={() => setShowCountryPicker(true)}
            style={[
              ...inputStyle(false),
              styles.countryInput,
            ]}
          >
            <View style={styles.countryValue}>
              <Text style={styles.flag}>{flagEmoji(countryCode)}</Text>

              <Text
                style={{
                  color: colors.text,
                }}
              >
                {countryName}
              </Text>
            </View>

            <Text
              style={{
                color: colors.textSecondary,
              }}
            >
              ▼
            </Text>
          </Pressable>
        </View>

        {/* Country Picker */}
        <CountryPicker
          countryCode={countryCode}
          visible={showCountryPicker}
          withFilter
          withCountryNameButton={false}
          withFlagButton={false}
          onSelect={handleCountrySelect}
          onClose={() => setShowCountryPicker(false)}
        />

        {/* Save Button */}
        <Pressable
          onPress={handleSubmit}
          disabled={saving}
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor:
                pressed || saving ? colors.primaryPressed : colors.primary,
            },
          ]}
        >
          {saving ? (
            <View style={styles.savingRow}>
              <ActivityIndicator color={colors.onPrimary} />

              <Text
                style={[
                  styles.saveButtonText,
                  {
                    color: colors.onPrimary,
                  },
                ]}
              >
                Saving...
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.saveButtonText,
                {
                  color: colors.onPrimary,
                },
              ]}
            >
              Save
            </Text>
          )}
        </Pressable>

        {/* Success Banner */}
        {saved && (
          <View
            style={[
              styles.successBanner,
              {
                backgroundColor: colors.successSoft,
              },
            ]}
          >
            <Text style={[styles.successText, { color: colors.success }]}>
              ✓ Settings saved successfully
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    fontSize: 15,
  },

  errorText: {
    fontSize: 13,
    marginTop: 6,
  },

  countryInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  countryValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  flag: {
    fontSize: 22,
  },

  saveButton: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },

  savingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  successBanner: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 14,
  },

  successText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
