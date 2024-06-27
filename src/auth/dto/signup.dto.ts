import { IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(2, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
