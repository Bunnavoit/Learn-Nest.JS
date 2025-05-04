import { Module } from '@nestjs/common';
import { CoffeController } from './coffe.controller';
import { CoffeService } from './coffe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entites/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffe, Flavor, Event])], // this is the way to import the Coffe entity
  controllers: [CoffeController],
  providers: [CoffeService],
})
export class CoffeModule {}
