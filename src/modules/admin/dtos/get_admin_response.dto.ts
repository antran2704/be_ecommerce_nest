import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GetAdminReponseDto {
  @ApiProperty({
    required: true,
    example: 'phamtrangiaan27@gmail.com',
  })
  @AutoMap()
  email: string;

  @ApiProperty({
    required: true,
    example: 'antran',
  })
  @AutoMap()
  name: string;

  @ApiProperty({
    required: true,
    example: true,
  })
  @AutoMap()
  isAdmin: boolean;

  @ApiProperty({
    required: true,
    example: true,
  })
  @AutoMap()
  isActive: boolean;
}