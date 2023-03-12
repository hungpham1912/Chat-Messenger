import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginateQuery } from 'nestjs-paginate';
import { CreateConversationDto } from 'src/module/core/conversations/dto/create-conversation.dto';
import { User } from 'src/module/core/users/entities/user.entity';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CliConversationService } from './conversation.service';

@ApiTags('Conversations')
@Controller()
export class CliConversationController {
  constructor(
    private readonly cliConversationService: CliConversationService,
  ) {}

  @Post('/conversations')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User chats' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createConversation(
    @AuthResponse() user: User,
    @Body() body: CreateConversationDto,
  ) {
    try {
      return await this.cliConversationService.create(user, body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }

  @Get('/conversations')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User chats' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getConversation(@AuthResponse() user: User, query: PaginateQuery) {
    try {
      return await this.cliConversationService.getConversation(user, query);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
