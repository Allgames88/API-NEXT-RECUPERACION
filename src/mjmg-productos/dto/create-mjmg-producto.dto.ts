import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMjmgProductoDto {
  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  descripcion: string;

  @IsString()
  proveedor: string;

  @IsInt()
  stock: number;

  @IsNumber()
  pvp: number;

  @IsNumber()
  pcoste: number;

  @IsString()
  codgama: string;
}
