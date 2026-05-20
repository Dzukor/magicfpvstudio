import { useAuth } from "@/contexts/AuthContext";
import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <View style={styles.nav}>
      <Link href="/main" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Main Panel</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/archive" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Archive</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgb(28, 28, 28)",
    minHeight: 80,
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
    borderTopWidth: 1,
    borderColor: "rgb(70, 45, 5)",
  },
  text: {
    textAlign: "center",
    color: "rgb(230, 170, 60)",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    minWidth: 100,
    padding: 12,
    backgroundColor: "rgb(32, 32, 32)",
    borderColor: "rgb(196, 129, 28)",
    borderStyle: "solid",
    borderRadius: 26,
    borderWidth: 3,
  },
  logoutButton: {
    backgroundColor: "rgb(80, 30, 30)",
    borderColor: "rgb(255, 80, 80)",
  },
});
