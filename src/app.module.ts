import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeModule } from './coffe/coffe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [
    CoffeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123j',
      database: 'postgres',
      autoLoadEntities: true,
      // this synchronize configuration, let the typeORM automatically generate a SQL table from all the entities
      //and the metadata that they contain
      synchronize: true, // Note: set to false in production
      logging: true, // ← optional: see the SQL in your console
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
