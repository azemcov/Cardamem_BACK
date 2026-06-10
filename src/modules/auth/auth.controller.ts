import { LoginDto, RegisterDto } from '@dto/auth.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.email,
      dto.name,
      dto.password,
      dto.theme,
    );
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(
      dto.email,
      dto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return this.authService.getMe(req.user.userId);
  }
}
