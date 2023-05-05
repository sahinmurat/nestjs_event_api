import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AppJapanService {

    constructor(
        @Inject('App_name')
        private readonly name: string,


        @Inject('Message')
        private readonly message: string
        ) {
    }

    getHello(): string {
        return `${this.name}Hello Japan!, ${this.message}`;
    }
}