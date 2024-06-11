import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { MjmgGama } from "src/mjmg-gamas/entities/mjmg-gama.entity";

@Entity()
export class MjmgProducto {

    @PrimaryColumn('text', {
        nullable: false
    })
    codigo: string;

    @Column('text')
    nombre: string;

    @Column('text', {
        nullable: true
    })
    imagen?: string;

    @Column('text')
    proveedor: string;

    @Column('text')
    descripcion: string;

    @Column('int')
    stock: number;

    @Column('float')
    pvp: number;

    @Column('float')
    pcoste: number;

    @ManyToOne(() => MjmgGama, gama => gama.productos, { eager: true })
    codgama: MjmgGama;
}
