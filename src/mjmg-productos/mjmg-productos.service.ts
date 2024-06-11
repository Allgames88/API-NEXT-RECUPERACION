import { Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateMjmgProductoDto } from './dto/create-mjmg-producto.dto';
import { UpdateMjmgProductoDto } from './dto/update-mjmg-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MjmgProducto } from './entities/mjmg-producto.entity';
import { Repository } from 'typeorm';
import { MjmgGama } from 'src/mjmg-gamas/entities/mjmg-gama.entity';
import { MjmgGamasService } from 'src/mjmg-gamas/mjmg-gamas.service';

@Injectable()
export class MjmgProductosService {

  constructor(
    @InjectRepository(MjmgProducto) private readonly repo: Repository<MjmgProducto>,
    @Inject(forwardRef(() => MjmgGamasService)) private readonly gamaService: MjmgGamasService
  ){

  }

  productData = require('./../../data/productos.json');

  async mjmgNew(createMjmgProductoDto: CreateMjmgProductoDto) {
    try {
      const { codgama, ...productoData } = createMjmgProductoDto;

      // Busca la gama por código
      const gama = await this.gamaService.findOne(codgama);
      if (!gama) {
        throw new NotFoundException(`La Gama con el código ${codgama} no ha sido encontrada :(`);
      }

      // Crea el producto y asigna la gama
      const product = this.repo.create({
        ...productoData
      });
      product.codgama = gama;// Asigna la gama encontrada al producto

      
      await this.repo.save(product); // Asegúrate de esperar la operación de guardado

      return {
        data: product,
        msg: "Añadido nuevo producto",
        status: 200
      };
    } catch (err) {
      console.log("Un Error ha ocurrido en la creación de un Producto. (MjmgProductosService.mjmgNew())", err);
      throw new InternalServerErrorException("Un error ha ocurrido en la API");
    }
  }

  async findAll() {
    return await this.repo.find({});
  }

  async mjmgGetProducto(codigo: string) {
    const product = await this.repo.findOneBy({ codigo })

    if(!product){
      throw new NotFoundException(`El Repositorio con el ID ${codigo} no ha sido encontrado :(`)
    }

    return product
  }

}
