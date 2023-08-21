import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
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

  @Post('/tweets')
  createTweet(@Body() body: CreateTweetDTO) {
    return this.appService.postTweet(body);
  }

  @Get('/tweets')
  getTweets(@Query('page') page: number | null) {
    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  getTweetsByUserName(@Param('username') username: string) {
    return this.appService.getTweetsByUserName(username);
  }
}
