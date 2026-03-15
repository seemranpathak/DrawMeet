export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken?: string;
  message?: string;
}

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    "http://localhost:5000/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};


export const loginUser = async (
  payload: Omit<RegisterPayload, "username">
): Promise<AuthResponse> => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};