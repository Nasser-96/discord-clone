import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateServerDto } from './server.dto';
import { ServerService } from './server.service';
import { AuthGuard } from '../auth/auth.guard';
import { ServerMemberGuard } from './server-member.guard';

@Controller('server')
export class ServerController {
  constructor(private readonly serveService: ServerService) {}

  @UseGuards(AuthGuard)
  @Post()
  createServer(@Body() body: CreateServerDto, @Req() req) {
    return this.serveService.createServer(body, req?.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserServers(@Req() req) {
    return this.serveService.getUserServers(req?.user);
  }

  @UseGuards(ServerMemberGuard)
  @Get('/:server_id')
  getServerById(@Param() params: { server_id: string }) {
    return this.serveService.getServerById(params?.server_id);
  }
}
