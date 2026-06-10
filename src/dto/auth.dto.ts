import { IsEmailRu, IsInRu, IsNotEmptyRu, IsStringRu, MinLengthRu } from '@/src/common/validation/class-validator-ru';
import { PublicUser } from '@dto/user.dto';

export class RegisterDto {
  @IsEmailRu()
  email: PublicUser['email'];

  @IsStringRu()
  @IsNotEmptyRu()
  name: PublicUser['name'];

  @IsStringRu()
  @IsNotEmptyRu()
  @MinLengthRu(3)
  password: string;

  @IsInRu(['light', 'dark'])
  theme: PublicUser['theme'];
}

export class LoginDto {
  @IsEmailRu()
  email: PublicUser['email'];

  @IsStringRu()
  password: string;
}
