import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
      },
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRESS_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRESS_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'test_zenbit',
      models: [User, Post],
      autoLoadModels: true,
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'root',
      // database: 'test_zenbit',
      // models: [User, Post],
      // autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
