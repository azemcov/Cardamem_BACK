import { PrismaService } from '@/src/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(email: string, name: string, passwordHash: string) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateTheme(userId: string, theme: 'light' | 'dark') {
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
