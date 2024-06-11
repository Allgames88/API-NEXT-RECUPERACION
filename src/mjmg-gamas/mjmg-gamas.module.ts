import { Module } from '@nestjs/common';
import { MjmgGamasService } from './mjmg-gamas.service';
import { MjmgGamasController } from './mjmg-gamas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MjmgGama } from './entities/mjmg-gama.entity';
import { MjmgProducto } from 'src/mjmg-productos/entities/mjmg-producto.entity';
import { MjmgProductosModule } from 'src/mjmg-productos/mjmg-productos.module';
import { MjmgProductosService } from 'src/mjmg-productos/mjmg-productos.service';

@Module({
  controllers: [MjmgGamasController],
  providers: [MjmgGamasService, MjmgProductosService],
  imports:[
    TypeOrmModule.forFeature([MjmgGama, MjmgProducto])
  ],
  exports:[
    TypeOrmModule.forFeature([MjmgGama]),
    MjmgGamasService
  ]
})
export class MjmgGamasModule {}
