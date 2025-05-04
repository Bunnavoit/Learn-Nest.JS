import { Coffe } from 'src/coffe/entities/coffe.entity';
import { Flavor } from 'src/coffe/entities/flavor.entity';
import { CoffeeRefactor1746329719260 } from 'src/migrations/1746329719260-CoffeeRefactor';
import { SchemaSync1746341725456 } from 'src/migrations/1746341725456-SchemaSync';

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123j',
  database: 'postgres',
  entities: [Coffe, Flavor],
  migrations: [CoffeeRefactor1746329719260, SchemaSync1746341725456],
});
