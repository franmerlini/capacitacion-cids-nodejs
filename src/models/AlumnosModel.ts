import { Expose } from "class-transformer";

export class AlumnosModel {
     @Expose({ name: "id_persona" })
     idPersona: number | null;
     @Expose({ name: "id_reparticion" })
     idReparticion: number | null;
     @Expose({ name: "id_alumno" })
     idAlumno: number;
     @Expose({ name: "cuil" })
     cuil: string | null;
     @Expose({ name: "nombre" })
     nombre: string | null;
     @Expose({ name: "apellido" })
     apellido: string | null;
     @Expose({ name: "edad" })
     edad: number | null;

     constructor(
          idPersona: number,
          idReparticion: number | null,
          idAlumno: number,
          cuil: string | null,
          nombre: string | null,
          apellido: string | null,
          edad: number
     ) {
          this.idPersona = idPersona;
          this.idReparticion = idReparticion;
          this.idAlumno = idAlumno;
          this.cuil = cuil;
          this.nombre = nombre;
          this.apellido = apellido;
          this.edad = edad;
     }
}
