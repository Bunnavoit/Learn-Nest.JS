import { CoffeService } from './coffe.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto.ts';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('coffe')
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  // @Get()
  // findAll() {
  //   return this.coffeService.findAll();
  // }
  @Get()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeService.findAll(paginationQuery); // ✅ Just call the service
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeDto: CreateCoffeDto) {
    console.log(createCoffeDto instanceof CreateCoffeDto);
    return this.coffeService.create(createCoffeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDTO: UpdateCoffeDto) {
    return this.coffeService.update(id, updateCoffeDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeService.remove(id);
  }
}
