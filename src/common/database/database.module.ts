import { Module } from "@nestjs/common";
import { MysSQLDatabaseModule } from "./mySQL/mySQL.module";

@Module({
  imports: [MysSQLDatabaseModule],
})
export class DatabaseModule {}
