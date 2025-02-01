import { Module } from "@nestjs/common";
import { ClerkClientProvider } from "./clerk/clerk_client.provider";

@Module({
  providers: [ClerkClientProvider],
})
export class AuthProviderModule {}
