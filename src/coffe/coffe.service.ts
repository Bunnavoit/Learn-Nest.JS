import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffe } from './entities/coffe.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto.ts';
import { Flavor } from './entities/flavor.entity';
import { skip } from 'node:test';
import { take } from 'rxjs';
import { Event } from 'src/events/entites/event.entity';

@Injectable()
export class CoffeService {
  // private readonly coffe = coffesData;

  constructor(
    @InjectRepository(Coffe)
    private readonly coffeRepository: Repository<Coffe>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly datasource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffees = await this.coffeRepository.findOne({
      where: { id: +id },
      relations: {
        flavors: true,
      },
    });
    if (!coffees) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffees;
  }

  async create(createCoffeDto: CreateCoffeDto) {
    const flavors = await Promise.all(
      createCoffeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeRepository.create({
      ...createCoffeDto,
      flavors,
    });

    return this.coffeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffe) {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendation++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
