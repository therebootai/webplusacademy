import jwt from "jsonwebtoken";

// Define the Payload type for the token (you can modify this to suit your payload structure)
interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  // Add other properties if needed
}

export function generateToken(payload: TokenPayload): string | null {
  try {
    if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY is missing");

    // Sign the token with the payload and secret key, set expiration
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
  } catch (err) {
    console.error(
      "Token generation error:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY is missing");
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (err) {
    console.error(
      "Invalid or expired token:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
};
