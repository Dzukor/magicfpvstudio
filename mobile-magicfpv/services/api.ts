import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL || "https://api.magicfpvstudio.com";

console.log("API_URL:", API_URL);

async function getAuthHeaders() {
  const token = await AsyncStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function login(username: string, password: string) {
  try {
    console.log("Attempting login to:", `${API_URL}/auth/login`);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    console.log("Login response status:", res.status);
    const data = await res.json();
    console.log("Login response:", data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function register(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function changePassword(
  username: string,
  oldPassword: string,
  newPassword: string,
) {
  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, oldPassword, newPassword }),
  });
  return res.json();
}

export async function postOrder(data: any) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getOrders(filters?: {
  company?: string;
  since?: string;
  to?: string;
}) {
  let url = `${API_URL}/orders`;
  const headers = await getAuthHeaders();
  const res = await fetch(url, { headers });
  const orders = await res.json();

  // client-side filtering
  if (filters) {
    return orders.filter((o: any) => {
      let match = true;
      if (
        filters.company &&
        !o.company.toLowerCase().includes(filters.company.toLowerCase())
      )
        match = false;
      if (filters.since && new Date(o.created_at) < new Date(filters.since))
        match = false;
      if (filters.to && new Date(o.created_at) > new Date(filters.to))
        match = false;
      return match;
    });
  }
  return orders;
}

export async function updateOrder(id: number, body: any) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  return res.json();
}

export default {
  login,
  register,
  changePassword,
  postOrder,
  getOrders,
  updateOrder,
};
