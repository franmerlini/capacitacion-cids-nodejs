import { plainToClass } from "class-transformer";
import { injectable } from "inversify";
import { getManager } from "typeorm";
import { Alumnos } from "../entities/Alumnos";
import { Personas } from "../entities/Personas";
import { AlumnosModel } from "../models/AlumnosModel";
import { IAlumnosService } from "./interface/IAlumnosService";

@injectable()
export class AlumnosService implements IAlumnosService {
     constructor() {}

     /**
      * Metodo asincrono que retorna un listado de todos los alumnos.
      * Utiliza getRepository para la consulta a la base de datos
      * @returns arreglo de Alumnos
      */
     public async obtenerAlumnosConGR(): Promise<Alumnos[]> {
          try {
               return await getManager()
                    .getRepository(Alumnos)
                    .find({
                         relations: ["idPersona2", "idReparticion2"],
                    });
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincrono que retorna un listado de todos los alumnos.
      * Utiliza createQueryBuilder para la consulta a la base de datos
      * @returns arreglo de Alumnos
      */
     public async obtenerAlumnosConQB(): Promise<Alumnos[]> {
          try {
               return await getManager()
                    .createQueryBuilder(Alumnos, "a")
                    .leftJoinAndSelect("a.idPersona2", "p")
                    .leftJoinAndSelect("a.idReparticion2", "r")
                    .select([
                         "a.idAlumno as idAlumno",
                         "p.nombre as nombre",
                         "p.apellido as apellido",
                         "p.cuil as cuil",
                         "p.edad as edad",
                         "r.nombre as reparticion",
                         "r.idReparticion as idReparticion",
                    ])
                    .getRawMany();
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincrono que retorna un alumno pasando como parametro el CUIL de la persona asociada a dicho alumno.
      * Utiliza getRepository para la consulta a la base de datos
      * @param cuil
      * @returns Alumno
      */
     public async obtenerAlumnoPorCUILConGR(cuil: string): Promise<Alumnos> {
          /*
          try {
               let resultado: AlumnosModel;
               await getManager()
                    .query(`CALL OBT_ALUMNOSXCUIL(${cuil})`)
                    .then((x) => {
                         let result: AlumnosModel;
                         result = plainToClass(AlumnosModel, x[0], {
                              excludeExtraneousValues: true,
                         });
                         console.error(result);
                         resultado = result;
                         console.log(resultado.idAlumno);
                    })
                    .catch((e) => {
                         console.log("No se encontraron registros.");
                    });
               return resultado;
          } catch (e) {
               console.error(e);
               return null;
          }*/

          try {
               return await getManager()
                    .getRepository(Alumnos)
                    .findOne({
                         relations: ["idPersona2"],
                         where: {
                              idPersona2: {
                                   cuil,
                              },
                         },
                    });
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincrono que crea un alumno a partir de los datos pasados en el body de la request.
      * Utiliza getRepository para la consulta a la base de datos
      * @param body
      * @returns true, si se pudo crear el Alumno. false, caso contrario
      */
     public async crearAlumnoConGR(body: Alumnos): Promise<Alumnos> {
          try {
               const nuevaPersona = await getManager()
                    .getRepository(Personas)
                    .create({
                         nombre: body.idPersona2.nombre,
                         apellido: body.idPersona2.apellido,
                         edad: body.idPersona2.edad,
                         cuil: body.idPersona2.cuil,
                    });

               const personaCreada = await getManager()
                    .getRepository(Personas)
                    .save(nuevaPersona);

               const nuevoAlumno = await getManager()
                    .getRepository(Alumnos)
                    .create({
                         idReparticion: body.idReparticion,
                         idPersona: personaCreada.idPersona,
                    });

               return await getManager()
                    .getRepository(Alumnos)
                    .save(nuevoAlumno);
          } catch (e) {
               console.error(e);
               return e;
          }
     }

     /**
      * Metodo asincrono que elimina un alumno pasando como parametro el CUIL de la persona asociada a dicho alumno.
      * Utiliza getRepository para la consulta a la base de datos
      * @param cuil
      * @returns true, si se pudo eliminar el Alumno. false, caso contrario
      */
     public async eliminarAlumnoConGR(cuil: string): Promise<boolean> {
          try {
               const alumno = await getManager()
                    .getRepository(Alumnos)
                    .findOne({
                         relations: ["idPersona2"],
                         where: {
                              idPersona2: {
                                   cuil,
                              },
                         },
                    });

               if (alumno) {
                    await getManager()
                         .getRepository(Alumnos)
                         .delete(alumno.idAlumno);

                    return true;
               }
          } catch (e) {
               console.error(e);
               return false;
          }
     }

     /**
      * Metodo asincronico que permite modificar los datos de un alumno pasando como parámetro el CUIL.
      * Utiliza getRepository para la consulta a la base de datos
      * @param body
      * @returns Alumno
      */
     public async modificarAlumnoConGR(
          cuil: string,
          body: Alumnos
     ): Promise<Alumnos> {
          try {
               const alumno = await getManager()
                    .getRepository(Alumnos)
                    .findOne({
                         relations: ["idPersona2"],
                         where: {
                              idPersona2: {
                                   cuil,
                              },
                         },
                    });

               if (alumno) {
                    const persona = await getManager()
                         .getRepository(Personas)
                         .findOne(alumno.idPersona);

                    const personaActualizada = await getManager()
                         .getRepository(Personas)
                         .merge(persona, {
                              nombre: body.idPersona2.nombre,
                              apellido: body.idPersona2.apellido,
                              edad: body.idPersona2.edad,
                              cuil: body.idPersona2.cuil,
                         });

                    await getManager()
                         .getRepository(Personas)
                         .save(personaActualizada);

                    const alumnoActualizado = await getManager()
                         .getRepository(Alumnos)
                         .merge(alumno, {
                              idReparticion: body.idReparticion,
                              idPersona: personaActualizada.idPersona,
                         });

                    return await getManager()
                         .getRepository(Alumnos)
                         .save(alumnoActualizado);
               } else {
                    return null;
               }
          } catch (e) {
               console.error(e);
               return null;
          }
     }
}
