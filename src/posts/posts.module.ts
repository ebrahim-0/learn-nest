import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { LoggerMiddleware } from 'src/middlewares/logger/logger.middleware';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'posts/(.*)', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
