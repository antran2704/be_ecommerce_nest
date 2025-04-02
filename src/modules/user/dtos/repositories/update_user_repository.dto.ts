import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export default class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
