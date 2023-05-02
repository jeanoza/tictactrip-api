import jwt from "jsonwebtoken";

export function generate(email: string): string {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign({ email }, secret, {
    expiresIn: "1d",
  });
  return token;
}

export function verify(token: string) {
  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret);
}

export default this;
