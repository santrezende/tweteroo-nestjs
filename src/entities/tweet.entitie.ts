import User from './user.entitie';

export default class Tweet {
  user: User;
  tweet: string;

  constructor(user: User, tweet: string) {
    this.user = user;
    this.tweet = tweet;
  }
}
