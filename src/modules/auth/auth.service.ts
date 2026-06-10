import { PublicUser } from '@dto/user.dto';
import { PrismaService } from '@infra/prisma/prisma.service';
import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(email: PublicUser['email'], name: PublicUser['name'], password: string, theme: PublicUser['theme']) {
    const existing = await this.userService.getByEmail(email);

    if (existing) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser(email, name, hash, theme);

    return this.signToken(user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.passwordHash) {
      throw new HttpException('Password login not available', HttpStatus.NOT_FOUND);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    return this.signToken(user.id, user.email);
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        theme: true,
      },
    });
  }

  private signToken(userId: string, email: string) {
    return {
      access_token: this.jwtService.sign({
        sub: userId,
        email,
      }),
    };
  }
}
