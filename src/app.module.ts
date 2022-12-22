import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AdminsModule } from './admins/admins.module';
import knexConfig from 'knexfile';
import config from './config';
import { MailerModule } from '@nestjs-modules/mailer';
import { OrdersModule } from './orders/orders.module';
import { ToursModule } from './tours/tours.module';
import { FavouritesModule } from './favourites/favourites.module';
import { ToursMediaModule } from './tours_media/tours_media.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    KnexModule.forRoot({ config: knexConfig[config.server.env] }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        port:465,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    AuthModule,
    UsersModule,
    FilesModule,
    AdminsModule,
    OrdersModule,
    ToursModule,
    FavouritesModule,
    ToursMediaModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
