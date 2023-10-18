import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost', //process.env.POSTGRES_HOST
      port: 5432, //Number(process.env.POSTGRESS_PORT),
      username: 'postgres', //process.env.POSTGRES_USER//,
      password: 'root', //process.env.POSTGRESS_PASSWORD,
      database: 'test_zenbit', //process.env.POSTGRES_DB,
      models: [User, Post],
      autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
