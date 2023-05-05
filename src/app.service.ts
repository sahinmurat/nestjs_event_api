import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
    @Inject('App_name')
    private readonly name: string) {
  }

  getHello(): string {
    return `${this.name}Hello World!`;;
  }
}
