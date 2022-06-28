import { MinLength, IsString, MaxLength, Matches } from 'class-validator';

export class AuthCredentailsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
