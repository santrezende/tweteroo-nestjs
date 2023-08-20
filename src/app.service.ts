import { Injectable } from '@nestjs/common';
import { CreateTweetDTO } from './dto/tweet.dto';
import { CreateUserDTO } from './dto/user.dto';
import Tweet from './entities/tweet.entitie';
import User from './entities/user.entitie';

@Injectable()
export class AppService {
  users: User[];
  tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHello(): string {
    return 'Hello World!';
  }

  postUser(newUser: CreateUserDTO) {
    this.users.push(newUser);
  }

  postTweet(newTweet: CreateTweetDTO) {
    const userTweet = this.users.find(
      (user) => user.username === newTweet.username,
    );

    if (userTweet) {
      this.tweets.push({
        user: userTweet,
        tweet: newTweet.tweet,
      });
    } else {
      throw new Error('UNAUTHORIZED');
    }
  }
}
