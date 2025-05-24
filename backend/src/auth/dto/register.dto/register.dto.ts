import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class RegisterDto {
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  address: string | null;

  @IsEnum(['male', 'female', 'unknow'], {
    message: 'gender must be male, female, or unknow',
  })
  gender: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsEnum(['user', 'seller', 'admin'], {
    message: 'role must be user, seller, or admin',
  })
  role: string;

  @IsOptional()
  @IsString()
  avt: string | null;
}
