import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  signInput: string;

  @MinLength(6)
  password: string;
}
