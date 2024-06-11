import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MjmgProductosService } from './mjmg-productos.service';
import { CreateMjmgProductoDto } from './dto/create-mjmg-producto.dto';
import { UpdateMjmgProductoDto } from './dto/update-mjmg-producto.dto';

@Controller('productos')
export class MjmgProductosController {
  constructor(private readonly mjmgProductosService: MjmgProductosService) {}

  @Post()
  create(@Body() createMjmgProductoDto: CreateMjmgProductoDto) {
    return this.mjmgProductosService.mjmgNew(createMjmgProductoDto);
  }

  @Get()
  findAll() {
    return this.mjmgProductosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mjmgProductosService.mjmgGetProducto(id);

  }
}
