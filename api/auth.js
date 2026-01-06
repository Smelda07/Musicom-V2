// lib/api/auth.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://apps.turyna.eu/apitte/api/v1";

/**
 * Přihlásí uživatele a uloží token
 * @param {string} identifier - email nebo username
 * @param {string} password
 * @returns {Promise<Object>} - objekt s user a token
 */
export async function signIn(identifier, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Login failed");
  }

  const data = await res.json();

  // Uložení tokenu do AsyncStorage
  if (data.token) {
    await AsyncStorage.setItem("token", data.token);
  }

  return data; // obsahuje { user, token, expiresAt, requires2fa }
}
