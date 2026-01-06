// lib/api/users.js
const API_URL = "https://apps.turyna.eu/apitte/api/v1";

/**
 * Vytvoří nového uživatele přes Musicom API
 * Endpoint vrací 201 s prázdným tělem
 * @param {Object} data - { username, email, firstName, lastName, password }
 * @returns {Promise<boolean>} - true pokud registrace proběhla
 */
export async function createUser(data) {
  const res = await fetch(`${API_URL}/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create user");
  }

  // Endpoint vrací prázdné body → prostě vracíme true
  return true;
}
