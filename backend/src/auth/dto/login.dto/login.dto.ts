import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  @IsEmail()
  email: string;

  @MaxLength(10)
  @MinLength(10)
  phone: string;

  @MinLength(6)
  password: string;
}
