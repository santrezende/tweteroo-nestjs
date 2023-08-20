import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTweetDTO } from './dto/tweet.dto';
import { CreateUserDTO } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  createUser(@Body() body: CreateUserDTO) {
    return this.appService.postUser(body);
  }

  @Post('/tweet')
  createTweet(@Body() body: CreateTweetDTO) {
    try {
      return this.appService.postTweet(body);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
