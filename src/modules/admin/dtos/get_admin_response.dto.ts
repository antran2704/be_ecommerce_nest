import { ApiProperty } from '@nestjs/swagger';

export class GetAdminReponseDto {
  @ApiProperty({
    required: true,
    example: 'phamtrangiaan27@gmail.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'antran',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: true,
  })
  isAdmin: boolean;

  @ApiProperty({
    required: true,
    example: true,
  })
  isActive: boolean;
}