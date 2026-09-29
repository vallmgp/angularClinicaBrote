// Entidad Paciente: los datos que captura el formulario de registro.
export class Paciente {
  constructor(
    public id: number,
    public nombreCompleto: string,
    public correo: string,
    public telefono: string,
    public tipoDocumento: string,
    public numeroDocumento: string,
    public fechaNacimiento: string,
    public genero: string
  ) {}
}
