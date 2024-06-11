import { PartialType } from '@nestjs/mapped-types';
import { CreateMjmgProductoDto } from './create-mjmg-producto.dto';

export class UpdateMjmgProductoDto extends PartialType(CreateMjmgProductoDto) {}
