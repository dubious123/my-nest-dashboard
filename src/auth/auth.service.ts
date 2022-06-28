import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentailsDto } from './dto/auth-credentialsDto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentailsDto: AuthCredentailsDto): Promise<void> {
    return this.userRepository.createUser(authCredentailsDto);
  }
  async signIn(
    authCredentailsDto: AuthCredentailsDto,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = authCredentailsDto;
    const user = await this.userRepository.findOne({ userName });

    if (user != null && (await bcrypt.compare(password, user.password))) {
      const payload = { userName };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
