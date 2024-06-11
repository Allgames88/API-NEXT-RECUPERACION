import { MjmgProducto } from "src/mjmg-productos/entities/mjmg-producto.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MjmgGama {
    @PrimaryColumn('text')
    nombre: string;

    @Column('text')
    descripcion: string;

    @Column('text')
    imagen: string;

    @OneToMany(() => MjmgProducto, producto => producto.codgama)
    productos: MjmgProducto[];
}
