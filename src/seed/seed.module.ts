import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MjmgGama } from 'src/mjmg-gamas/entities/mjmg-gama.entity';
import { MjmgProducto } from 'src/mjmg-productos/entities/mjmg-producto.entity';
import { MjmgGamasModule } from 'src/mjmg-gamas/mjmg-gamas.module';
import { MjmgProductosModule } from 'src/mjmg-productos/mjmg-productos.module';
import { MjmgProductosService } from 'src/mjmg-productos/mjmg-productos.service';
import { MjmgGamasService } from 'src/mjmg-gamas/mjmg-gamas.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService, MjmgProductosService, MjmgGamasService],
  imports:[MjmgProductosModule, MjmgGamasModule] // Import MjmgProductosModule first
})
export class SeedModule {}
