import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateMjmgGamaDto {



    @IsString({message:"La Descripción debe ser un campo String."})
    descripcion: string;

    @IsString()
    imagen: string;

    @IsString({message: "El Nombre de la Gama debe de ser un string"})
    nombre: string


}
