import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMjmgGamaDto } from './dto/create-mjmg-gama.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MjmgGama } from './entities/mjmg-gama.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { MjmgProductosService } from 'src/mjmg-productos/mjmg-productos.service';
import { MjmgProducto } from 'src/mjmg-productos/entities/mjmg-producto.entity';


@Injectable()
export class MjmgGamasService {

  constructor(
    @InjectRepository(MjmgGama) private readonly repo: Repository<MjmgGama>,
    private readonly productosService: MjmgProductosService
  ){}

  seedData = require('./../../data/gamas.json');
  

  async create(createMjmgGamaDto: CreateMjmgGamaDto) {
    
    try{
        const gamma = this.repo.create(createMjmgGamaDto);
        this.repo.save(gamma)

        return {
          data: gamma,
          msg: "Añadida nueva Gama",
          status: 200
        }
    }catch(error){
      console.log("Un Error ha ocurrido en la creación de una Gama. (MjmgGamasService.create())");
      throw new InternalServerErrorException("Un error ha ocurrido en la API");

    }
  }

  findAll() {
    return this.repo.find({});
  }

  async findOne(nombre:string) {
    console.log("Searching for " + nombre)
    const gama = await this.repo.findOneBy({nombre});

    if(!gama){
      throw new NotFoundException(`La Gama llamada ${nombre} no ha sido encontrada :()` )
    }else{
      return gama;
    }
  
  }

  async mjmgGetGama(nombre:string) {
    const gama = await this.repo.findOneBy({ nombre });

    if(!gama){
      throw new NotFoundException(`La Gama llamada ${nombre} no ha sido encontrada :()` )
    }else{

      const productList = await this.productosService.findAll();

      const resultList = productList.map( producto => ({
        codigo: producto.codigo,
        nombre: producto.nombre,
        imagen: producto.imagen,
        proveedor: producto.proveedor,
        descripcion: producto.descripcion,
        stock: producto.stock,
        pvp: producto.pvp,
        pcoste: producto.pcoste
      }))

      return {
        gama: gama,
        productList: productList
      }
    }

  }

  /*
  
    async mjmgGetGama(nombre: string) {
    const gama = await this.repo.findOne({
      where: { nombre },
      relations: ['productos'] // Incluye la relación productos
    });

    if (!gama) {
      throw new NotFoundException(`La Gama llamada ${nombre} no ha sido encontrada :()`);
    }

    const productList = gama.productos.map(producto => ({
      codigo: producto.codigo,
      nombre: producto.nombre,
      imagen: producto.imagen,
      proveedor: producto.proveedor,
      descripcion: producto.descripcion,
      stock: producto.stock,
      pvp: producto.pvp,
      pcoste: producto.pcoste
    }));

    return {
      gammaName: gama.nombre,
      productList: productList
    };
  }
  */

}
