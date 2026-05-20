import Navbar from "@/components/Navbar";
import { changePassword } from "@/services/api";
import React from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Passchange() {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [newpass, setnewpass] = React.useState("");
  const [shownewpass, setshownewpass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChangePassword = async () => {
    if (!username || !password || !newpass) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setLoading(true);
    try {
      const result = await changePassword(username, password, newpass);
      if (result.message) {
        Alert.alert("Success", result.message);
        setusername("");
        setpassword("");
        setnewpass("");
      } else if (result.error) {
        Alert.alert("Error", result.error);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
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
          placeholder="current password"
          secureTextEntry={true}
          editable={!loading}
          placeholderTextColor="rgb(160, 100, 30)"
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputWithButton}
            value={newpass}
            onChangeText={setnewpass}
            placeholder="new password"
            secureTextEntry={!shownewpass}
            editable={!loading}
            placeholderTextColor="rgb(160, 100, 30)"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setshownewpass(!shownewpass)}
            disabled={loading}
          >
            <Text style={styles.eyeText}>{shownewpass ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}
        >
          <Text style={styles.text}>
            {loading ? "Changing..." : "Change password"}
          </Text>
        </TouchableOpacity>
      </View>
      <Navbar />
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
  inputWrapper: {
    position: "relative",
    width: "100%",
    backgroundColor: "rgb(22, 22, 22)",
    borderColor: "rgb(196, 129, 28)",
    borderStyle: "solid",
    borderRadius: 28,
    borderWidth: 3,
  },
  inputWithButton: {
    padding: 12,
    paddingRight: 50,
    color: "rgb(230, 170, 60)",
    fontSize: 16,
    width: "100%",
  },
  eyeButton: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeText: {
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
