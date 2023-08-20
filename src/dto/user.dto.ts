import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}
