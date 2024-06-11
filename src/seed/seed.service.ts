import { Inject, Injectable, InternalServerErrorException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MjmgGama } from 'src/mjmg-gamas/entities/mjmg-gama.entity';
import { Repository } from 'typeorm';
import { MjmgProducto } from 'src/mjmg-productos/entities/mjmg-producto.entity';
import { MjmgGamasService } from 'src/mjmg-gamas/mjmg-gamas.service';
import { MjmgProductosService } from 'src/mjmg-productos/mjmg-productos.service';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(MjmgGama) private readonly GamasRepo: Repository<MjmgGama>,
    @InjectRepository(MjmgProducto) private readonly ProductosRepo: Repository<MjmgProducto>,
    @Inject(forwardRef(() => MjmgGamasService)) private readonly gamasService: MjmgGamasService,
    @Inject(forwardRef(() => MjmgProductosService)) private readonly productosService: MjmgProductosService
  ){  }


  /*
    Chonky Nyan Cat
  
    ________▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄______
  _______█░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░█_____
  _______█░▒▒▒▒▒▒▒▒▒▒▄▀▀▄▒▒▒░░█▄▀▀▄_
  __▄▄___█░▒▒▒▒▒▒▒▒▒▒█▓▓▓▀▄▄▄▄▀▓▓▓█_
  █▓▓█▄▄█░▒▒▒▒▒▒▒▒▒▄▀▓▓▓▓▓▓▓▓▓▓▓▓▀▄_
  _▀▄▄▓▓█░▒▒▒▒▒▒▒▒▒█▓▓▓▄█▓▓▓▄▓▄█▓▓█_
  _____▀▀█░▒▒▒▒▒▒▒▒▒█▓▒▒▓▄▓▓▄▓▓▄▓▒▒█      
  ______▄█░░▒▒▒▒▒▒▒▒▒▀▄▓▓▀▀▀▀▀▀▀▓▄▀_
  ____▄▀▓▀█▄▄▄▄▄▄▄▄▄▄▄▄██████▀█▀▀___
  ____█▄▄▀_█▄▄▀_______█▄▄▀_▀▄▄█_____

  
  
  */

  seedData = require('./../../data/gamas.json');
  productData = require('./../../data/productos.json');

  async seed() {
    try {
      // Remove all Entries
      await this.deleteAllProducts();
      await this.deleteAllGamas();
  
      // Seed Gammas
      const Gammed = await this.seedGammas();
      if (!Gammed) {
        throw new InternalServerErrorException("Error al ejecutar el seed de las Gamas");
      }
  
        
    } catch (error) {
      throw new InternalServerErrorException("Error al ejecutar el seed", error);
    }
  }
  

  async seedProducts() {
    for (const prod of this.productData) {
        let retryCount = 0;
        let success = false;
        
        while (!success && retryCount < 25) { // Define MAX_RETRY como el número máximo de intentos de reintento
            try {
                await this.productosService.mjmgNew(prod);
                success = true;
            } catch (error) {
                // Maneja el error (puedes registrar, imprimir en consola, etc.)
                console.error(`Error al crear el producto: ${error}`);
                
                // Incrementa el contador de reintento
                retryCount++;
                
                // Espera un tiempo antes de intentar de nuevo (puedes ajustar este tiempo según tus necesidades)
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        
        if (!success) {
            console.error(`No se pudo crear el producto después de ${25} intentos`);
        }
    }
    
    return true;
}


  async seedGammas(){
    try {
      for (const gama of this.seedData) {

        console.log(gama.nombre);
        await this.gamasService.create(gama);
      }

      await this.seedProducts();

    } catch (error) {
      console.error("Error al ejecutar el seed de las gamas", error);
      return false;
    }

    return true;
}


  async deleteAllGamas(){
    const query = this.GamasRepo.createQueryBuilder('mjmgGama')
    try{
      return await query
        .delete()
        .where({})
        .execute()
    }catch(err){
      throw new InternalServerErrorException("Error al eliminar (Gamas) elementos de la base de datos")
    }
  }

  async deleteAllProducts(){
    const query = this.ProductosRepo.createQueryBuilder('mjmgProduct')
    try{
      return await query
        .delete()
        .where({})
        .execute()
    }catch(err){
      throw new InternalServerErrorException("Error al eliminar elementos (Productos) de la base de datos")
    }
  }
}
