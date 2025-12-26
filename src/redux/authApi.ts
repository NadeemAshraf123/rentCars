const BASE_URL = "http://localhost:3003";

export const signupApi = async (userData) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Signup failed");
  return await res.json();
};

export const loginApi = async (email, password) => {
  const res = await fetch(
    `${BASE_URL}/users?email=${email}&password=${password}`
  );
  const data = await res.json();
  if (data.length === 0) throw new Error("Invalid credentials");
  return data[0]; // user object
};
