import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import {eyeClosed, kLoudiusLogo, openEye} from '../assets/constants';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Login error");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <Image source={kLoudiusLogo} style={styles.logo} />
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={null}
          />
          <View style={{ position: "relative" }}>
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry={!visible}
              value={password}
              onChangeText={setPassword}
              error={null}
            />
            <TouchableOpacity
              onPress={() => setVisible((v) => !v)}
              style={{ position: "absolute", right: 12, top: 36 }}
              accessibilityLabel="Toggle password visibility"
            >
              <Image source={!visible ? eyeClosed : openEye} />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: "#007AFF" }}>Go to Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fa", alignItems: "center", justifyContent: "center", padding: 16 },
  logo: { position: "absolute", top: 20, marginHorizontal: 16, resizeMode: "contain", height: 200, width: 200, borderRadius: 16},
  card: { width: "100%", maxWidth: 420, backgroundColor: "#fff", padding: 20, borderRadius: 12, elevation: 2 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", marginTop: 12, justifyContent: "center" },
  errorText: { color: "#e74c3c", marginTop: 8},
});
