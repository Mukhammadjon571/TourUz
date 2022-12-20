import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import  knexConfig  from 'knexfile';
import config from './config';

@Module({
  imports: [
    KnexModule.forRoot({config:knexConfig[config.server.env]}),
    AuthModule,
    UsersModule,
    FilesModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
