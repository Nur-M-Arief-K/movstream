import { jwtVerify } from "jose";

export async function verifyToken(token) {
<<<<<<< HEAD
  try {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return verified.payload && verified.payload?.issuer;
    }
    return null;
  } catch (err) {
    console.error({ err });
    return null;
  }
}
=======
  if (token) {
    try {
      if (token) {
        const verified = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return verified.payload && verified.payload?.issuer;
      }
      return null;
    } catch (err) {
      console.error({ err });
      return null;
    }
  }
}
>>>>>>> 12f2c84 (implements middleware)
