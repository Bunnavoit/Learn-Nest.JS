import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeModule } from './coffe/coffe.module';

@Module({
  imports: [CoffeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
