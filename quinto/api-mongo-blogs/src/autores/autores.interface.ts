export interface IAutores extends Document{
  name: string;
  apellido: string;
  nacionalidad: string;
  nacimiento: Date;
  genero: boolean;
}
