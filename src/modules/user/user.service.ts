import { PrismaService } from '@/src/infra/prisma/prisma.service';
import { PublicUser } from '@dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(email: PublicUser['email'], name: PublicUser['name'], passwordHash: string, theme: PublicUser['theme']) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        theme,
      },
    });
  }

  getByEmail(email: PublicUser['email']) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateTheme(userId: string, theme: PublicUser['theme']) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { theme },
      select: {
        id: true,
        email: true,
        name: true,
        theme: true,
      },
    });
  }
}
