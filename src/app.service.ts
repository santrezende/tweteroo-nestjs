import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTweetDTO } from './dto/tweet.dto';
import { CreateUserDTO } from './dto/user.dto';
import Tweet from './entities/tweet.entitie';
import User from './entities/user.entitie';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHello(): string {
    return `I'm okay!`;
  }

  postUser(newUser: CreateUserDTO) {
    const user = new User(newUser.username, newUser.avatar);
    return this.users.push(user);
  }

  postTweet(newTweet: CreateTweetDTO) {
    const userTweet = this.users.find(
      (user) => user.username === newTweet.username,
    );

    if (userTweet) {
      const tweet = new Tweet(userTweet, newTweet.tweet);
      return this.tweets.push(tweet);
    } else {
      throw new UnauthorizedException();
    }
  }

  getTweets(page: number) {
    const formattedPage = page === undefined ? null : Number(page);
    if (formattedPage === null) {
      const selectedTweets = this.tweets.slice(-15);
      const formattedTweets = selectedTweets.map((tweet) => {
        return {
          username: tweet.user.username,
          avatar: tweet.user.avatar,
          tweet: tweet.tweet,
        };
      });
      return formattedTweets;
    }

    if (isNaN(formattedPage) || formattedPage < 1) {
      throw new BadRequestException('Enter a valid number page!');
    }

    const startIndex = (formattedPage - 1) * 15;
    const endIndex = startIndex + 15;
    const selectedTweets = this.tweets.slice(startIndex, endIndex);

    const formattedTweets = selectedTweets.map((tweet) => {
      return {
        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet,
      };
    });

    return formattedTweets;
  }

  getTweetsByUserName(username: string) {
    const userTweets = this.tweets.filter(
      (tweet) => tweet.user.username === username,
    );

    if (!userTweets) return userTweets;

    const formattedTweets = userTweets.map((tweet) => {
      return {
        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet,
      };
    });

    return formattedTweets;
  }
}
