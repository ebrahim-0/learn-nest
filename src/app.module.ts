import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  exports: [],
  imports: [ProductsModule, PostsModule],
})
export class AppModule {}
