import { PartialType } from '@nestjs/mapped-types';
import { CreateMjmgGamaDto } from './create-mjmg-gama.dto';

export class UpdateMjmgGamaDto extends PartialType(CreateMjmgGamaDto) {}
