import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDTO {
  @IsString()
  @IsNotEmpty({ message: 'All fields are required!' })
  username: string;

  @IsNotEmpty({ message: 'All fields are required!' })
  tweet: string;
}
