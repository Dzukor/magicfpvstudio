import React from "react";
import {
  StyleSheet,
  TextInput,
  View
} from "react-native";

interface FiltersProps {
  onFilterChange: (key: string, value: string) => void;
  onFilter: () => void;
}

export default function Filters({ onFilterChange, onFilter }: FiltersProps) {
  const [company, setcompany] = React.useState("");
  const [sincedate, setsincedate] = React.useState("");
  const [todate, settodate] = React.useState("");

  const handleCompanyChange = (text: string) => {
    setcompany(text);
    onFilterChange("company", text);
  };

  const handleSinceDateChange = (text: string) => {
    setsincedate(text);
    onFilterChange("since", text);
  };

  const handleToDateChange = (text: string) => {
    settodate(text);
    onFilterChange("to", text);
  };

  return (
    <View style={styles.filters}>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={handleCompanyChange}
        placeholder="company"
        placeholderTextColor="rgb(160, 100, 30)"
      />
      <TextInput
        style={styles.input}
        value={sincedate}
        onChangeText={handleSinceDateChange}
        placeholder="since (YYYY-MM-DD)"
        placeholderTextColor="rgb(160, 100, 30)"
      />
      <TextInput
        style={styles.input}
        value={todate}
        onChangeText={handleToDateChange}
        placeholder="to (YYYY-MM-DD)"
        placeholderTextColor="rgb(160, 100, 30)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    maxWidth: 300,
    backgroundColor: "rgb(30, 30, 30)",
    borderRadius: 28,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 20,
    margin: "auto",
    borderWidth: 1,
    borderColor: "rgb(70, 45, 5)",
  },
  input: {
    width: 250,
    padding: 12,
    backgroundColor: "rgb(22, 22, 22)",
    borderColor: "rgb(196, 129, 28)",
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 2,
    color: "rgb(230, 170, 60)",
    fontSize: 16,
  },
  button: {
    margin: "auto",
    minHeight: 50,
    minWidth: 120,
    padding: 8,
    backgroundColor: "rgb(196, 129, 28)",
    borderRadius: 36,
  },
  text: {
    margin: "auto",
    textAlign: "center",
    color: "rgb(20, 20, 20)",
    fontSize: 16,
    fontWeight: "700",
  },
});
