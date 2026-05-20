import Filters from "@/components/Filters";
import Navbar from "@/components/Navbar";
import { getOrders, updateOrder } from "@/services/api";
import { useFocusEffect } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Svg, Text as SvgText } from "react-native-svg";

const formatDate = (timestamp: string | Date) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function ArchiveScreen() {
  const [orders, setOrders] = React.useState([]);
  const [filters, setFilters] = React.useState({
    company: "",
    since: "",
    to: "",
  });
  const [loading, setLoading] = React.useState(true);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  useFocusEffect(
    React.useCallback(() => {
      loadArchive();
    }, [filters]),
  );

  const loadArchive = async () => {
    setLoading(true);
    try {
      const filterObj = {
        company: filters.company || undefined,
        since: filters.since || undefined,
        to: filters.to || undefined,
      };
      const data = await getOrders(filterObj);
      // filter for status = 1 (archived/completed orders)
      const archived = data.filter((o: any) => o.status === 1);
      setOrders(archived);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load archived orders");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilter = async () => {
    await loadArchive();
  };

  const handleRestore = async (orderId: number) => {
    try {
      await updateOrder(orderId, { status: false });
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to restore order");
    }
  };

  return (
    <View style={styles.main}>
      <Svg height={50} width="100%" style={styles.archivesSvg}>
        <SvgText
          x="50%"
          y="30"
          textAnchor="middle"
          fontSize="24"
          fontWeight="800"
          fill="rgb(32, 32, 32)"
          stroke="rgb(196, 129, 28)"
          strokeWidth="2"
        >
          Clients archives
        </SvgText>
      </Svg>
      <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
        <Filters onFilterChange={handleFilterChange} onFilter={handleFilter} />
        <ScrollView style={styles.clients}>
          {loading ? (
            <Text style={styles.emptyText}>Loading...</Text>
          ) : orders.length === 0 ? (
            <Text style={styles.emptyText}>No archived orders</Text>
          ) : (
            orders.map((order: any) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Name:</Text>
                      <Text style={styles.orderText}>
                        {order.name} {order.surname}
                      </Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Company:</Text>
                      <Text style={styles.orderText}>{order.company}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Email:</Text>
                      <Text style={styles.orderText}>{order.email}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Phone:</Text>
                      <Text style={styles.orderText}>{order.phone}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Message:</Text>
                      <Text style={styles.orderText}>{order.message}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Date:</Text>
                      <Text style={styles.dateText}>
                        {formatDate(order.created_at)}
                      </Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Done:</Text>
                      <Text style={styles.completedText}>
                        {formatDate(order.ended_at)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => handleRestore(order.id)}
                  >
                    <Text style={styles.checkboxText}>☑</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "rgb(20, 20, 20)",
  },
  archivesSvg: {
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "rgb(30, 30, 30)",
    borderRadius: 36,
    padding: 20,
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
    borderWidth: 4,
    borderColor: "rgb(70, 45, 5)",
  },
  containerSmall: {
    flexDirection: "column",
  },
  clients: {
    flex: 1,
    backgroundColor: "rgb(22, 22, 22)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgb(70, 45, 5)",
    padding: 12,
  },
  orderCard: {
    backgroundColor: "rgb(32, 32, 32)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgb(70, 45, 5)",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  orderInfo: {
    flex: 1,
  },
  orderText: {
    color: "rgb(230, 170, 60)",
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    color: "rgb(200, 150, 80)",
    fontSize: 14,
    fontWeight: "400",
  },
  fieldLabel: {
    color: "rgb(100, 150, 100)",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 12,
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    flexWrap: "wrap",
  },
  checkbox: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgb(22, 22, 22)",
    borderWidth: 2,
    borderColor: "rgb(100, 200, 100)",
  },
  checkboxText: {
    fontSize: 24,
    color: "rgb(100, 200, 100)",
  },
  emptyText: {
    color: "rgb(230, 170, 60)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  completedText: {
    color: "rgb(100, 200, 100)",
    fontSize: 14,
    fontWeight: "400",
  },
});
