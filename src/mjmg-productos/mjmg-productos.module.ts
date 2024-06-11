import { Module } from '@nestjs/common';
import { MjmgProductosService } from './mjmg-productos.service';
import { MjmgProductosController } from './mjmg-productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MjmgProducto } from './entities/mjmg-producto.entity';
import { MjmgGama } from 'src/mjmg-gamas/entities/mjmg-gama.entity';
import { MjmgGamasService } from 'src/mjmg-gamas/mjmg-gamas.service';

@Module({
  controllers: [MjmgProductosController],
  providers: [MjmgProductosService, MjmgGamasService],
  imports: [
    TypeOrmModule.forFeature([MjmgProducto, MjmgGama]),
  ],
  exports:[
    TypeOrmModule.forFeature([MjmgProducto]),
    MjmgProductosService
  ]
})

export class MjmgProductosModule {}
