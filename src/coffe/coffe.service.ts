import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffe } from './entites/coffe.entity';
import * as coffesData from '../data/coffes-data.json';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

@Injectable()
export class CoffeService {
  private readonly coffe = coffesData;

  // findAll() {
  //   return this.coffe;
  // }
  findAll(paginationQuery: PaginationQueryDto): PaginatedResponseDto<Coffe> {
    const { limit = 10, page = 1 } = paginationQuery;
    const offset = (page - 1) * limit;

    const data = this.coffe.slice(offset, offset + limit);

    const metadata = {
      totalItems: this.coffe.length,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(this.coffe.length / limit),
    };

    return { data, metadata };
  }

  findOne(id: string) {
    const coffees = this.coffe.find((item) => item.id === +id);
    if (!coffees) {
      //   throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffees;
  }

  create(createCoffeDto: any) {
    this.coffe.push(createCoffeDto);
    return createCoffeDto;
  }

  update(id: string, updateCoffeDto: any) {
    const existingCoffe = this.findOne(id);
    if (existingCoffe) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffe.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffe.splice(coffeeIndex, 1);
    }
  }
}
