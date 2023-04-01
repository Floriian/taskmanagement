import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class AppModule {}
