import jwt from "jsonwebtoken";

export default class JwtModule {
  static generate(email: string): string {
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ email }, secret, {
      expiresIn: "1d",
    });
    return token;
  }
  static verify(token: string) {
    const secret = process.env.JWT_SECRET!;
    return jwt.verify(token, secret);
  }
}
