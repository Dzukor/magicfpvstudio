import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { login } from "../../services/api";

export default function LoginScreen() {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loginAttempts, setLoginAttempts] = React.useState(0);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await login(username, password);
      if (data && data.token) {
        await authLogin(data.token);
        setLoginAttempts(0);
        setError("");
      } else if (data && data.error) {
        setLoginAttempts(loginAttempts + 1);
        setError(`Login failed: ${data.error} (Attempt ${loginAttempts + 1})`);
      } else {
        setLoginAttempts(loginAttempts + 1);
        setError(`Unexpected response (Attempt ${loginAttempts + 1})`);
      }
    } catch (err: any) {
      console.error("Full error:", err);
      const errorMsg = err?.message || String(err) || "Unknown error";
      setLoginAttempts(loginAttempts + 1);
      setError(`Failed: ${errorMsg} (Attempt ${loginAttempts + 1})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setusername}
          placeholder="username"
          editable={!loading}
          placeholderTextColor="rgb(160, 100, 30)"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setpassword}
          placeholder="password"
          secureTextEntry={true}
          editable={!loading}
          placeholderTextColor="rgb(160, 100, 30)"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.text}>
            {loading ? "Logging in..." : "Log in"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "rgb(22, 22, 22)",
  },
  form: {
    margin: "auto",
    width: "90%",
    maxWidth: 400,
    minHeight: 300,
    backgroundColor: "rgb(32, 32, 32)",
    borderRadius: 28,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: "rgb(70, 45, 5)",
    shadowColor: "rgb(196, 129, 28)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
  },
  errorBox: {
    width: "100%",
    padding: 14,
    backgroundColor: "rgb(80, 30, 30)",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgb(255, 80, 80)",
  },
  errorText: {
    color: "rgb(255, 120, 120)",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "rgb(22, 22, 22)",
    borderColor: "rgb(196, 129, 28)",
    borderStyle: "solid",
    borderRadius: 28,
    borderWidth: 3,
    color: "rgb(230, 170, 60)",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "rgb(196, 129, 28)",
    borderRadius: 28,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    textAlign: "center",
    color: "rgb(22, 22, 22)",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
