import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('theme')
  updateTheme(
    @Request() req,
    @Body() body: { theme: 'light' | 'dark' },
  ) {
    return this.userService.updateTheme(req.user.userId, body.theme);
  }
}
