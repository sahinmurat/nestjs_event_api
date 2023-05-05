import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AppJapanService } from './app.japan.service';
import { AppDummy } from './app.dummy';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'nest-events',
    entities: [Event],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    synchronize: true,
  }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppJapanService,
  }, {
    provide: "App_name",
    useValue: "Nest Events Backend",
  }, {
    provide: "Message",
    inject: [AppDummy],
    useFactory: function (app) {
      return `${app.dummy()} Factory Message`;
    }
  }, AppDummy],
})
export class AppModule { }
