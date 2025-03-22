import { registerAs } from "@nestjs/config";

export default registerAs("clerk", () => ({
  publicKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));
