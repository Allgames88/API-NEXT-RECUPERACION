import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MjmgGamasService } from './mjmg-gamas.service';
import { CreateMjmgGamaDto } from './dto/create-mjmg-gama.dto';
import { UpdateMjmgGamaDto } from './dto/update-mjmg-gama.dto';

@Controller('gamas')
export class MjmgGamasController {
  constructor(private readonly mjmgGamasService: MjmgGamasService) {}

  @Post()
  create(@Body() createMjmgGamaDto: CreateMjmgGamaDto) {
    return this.mjmgGamasService.create(createMjmgGamaDto);
  }

  @Get()
  findAll() {
    return this.mjmgGamasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mjmgGamasService.mjmgGetGama(id);
  }

}
