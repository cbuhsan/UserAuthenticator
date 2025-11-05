import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello, {user?.name ?? "User"}!</Text>
        <Text style={styles.sub}>Email: {user?.email}</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ff3b30", marginTop: 20 }]}
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fa", alignItems: "center", justifyContent: "center", padding: 16 },
  card: { width: "100%", maxWidth: 420, backgroundColor: "#fff", padding: 20, borderRadius: 12, elevation: 2, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "600" },
  sub: { marginTop: 8, fontSize: 16, color: "#555" },
  button: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
});
