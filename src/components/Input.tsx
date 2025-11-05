import React from "react";
import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
};

const Input: React.FC<Props> = ({ label, error, ...props }) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, error ? styles.inputError : null]} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 6, color: "#222" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "#e74c3c" },
  error: { color: "#e74c3c", marginTop: 6, fontSize: 13 },
});
