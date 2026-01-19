import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY as string;

const createToken = (payload: object) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};

export { createToken, verifyToken };
