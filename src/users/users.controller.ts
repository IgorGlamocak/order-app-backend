import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Req,
  ForbiddenException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    // body = { fullName, email, password }
    return this.usersService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @Req() req: Request, // ← pull in the Express request
  ) {
    // req.user is set by JwtAuthGuard.validate()
    const user = (req as any).user;
    if (!user) {
      throw new UnauthorizedException();
    }
    // only allow admins or the owner
    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException();
    }

    return this.usersService.update(id, dto);
  }
}
