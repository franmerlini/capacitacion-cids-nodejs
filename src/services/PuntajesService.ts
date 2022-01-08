import { injectable } from "inversify";
import { IPuntajesService } from "./interface/IPuntajesService";
import { Puntajes } from "../entities/Puntajes";
import { getManager } from "typeorm";
import { Alumnos } from "../entities/Alumnos";
import { Personas } from "../entities/Personas";
import { Profesores } from "../entities/Profesores";

@injectable()
export class PuntajesService implements IPuntajesService {
     constructor() {}

     /**
      * Metodo asincrono que retorna un listado de todos los puntajes.
      * Utiliza getRepository para la consulta a la base de datos
      * @returns
      */
     public async obtenerPuntajesConGR(): Promise<Puntajes[]> {
          try {
               return await getManager()
                    .getRepository(Puntajes)
                    .find({
                         relations: [
                              "idAlumno2",
                              "idProfesor2",
                              "idTema2",
                              "idAlumno2.idPersona2",
                              "idProfesor2.idPersona2",
                         ],
                    });
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincrono que retorna un listado de todos los puntajes.
      * Utiliza createQueryBuilder para la consulta a la base de datos
      * @returns
      */
     public async obtenerPuntajesConQB(): Promise<Puntajes[]> {
          try {
               return await getManager()
                    .createQueryBuilder(Puntajes, "punt")
                    .leftJoinAndSelect("punt.idAlumno2", "a")
                    .leftJoinAndSelect("punt.idProfesor2", "prof")
                    .leftJoinAndSelect("punt.idTema2", "t")
                    .leftJoinAndSelect(
                         Personas,
                         "pers_a",
                         "pers_a.id_persona = a.id_persona"
                    )
                    .leftJoinAndSelect(
                         Personas,
                         "pers_prof",
                         "pers_prof.id_persona = prof.id_persona"
                    )
                    .select([
                         "punt.idPuntaje as idPuntaje",
                         "a.idAlumno as idAlumno",
                         "pers_a.nombre as nombreAlumno",
                         "pers_a.apellido as apellidoAlumno",
                         "prof.idProfesor as idProfesor",
                         "pers_prof.nombre as nombreProfesor",
                         "pers_prof.apellido as apellidoProfesor",
                         "t.idTema as idTema",
                         "t.nombre as tema",
                         "punt.interes as interes",
                         "punt.complejidad as complejidad",
                         "punt.entendimiento as entendimiento",
                         "punt.valoracion as valoracion",
                         "punt.observaciones as observaciones",
                    ])
                    .getRawMany();
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincrono que crea un puntaje a partir de los datos pasados en el body de la request.
      * Utiliza getRepository para la consulta a la base de datos
      * @param body
      * @returns
      */
     public async registrarPuntajeConGR(body: Puntajes): Promise<Puntajes> {
          try {
               const nuevoPuntaje = await getManager()
                    .getRepository(Puntajes)
                    .create({
                         idAlumno: body.idAlumno,
                         idProfesor: body.idProfesor,
                         idTema: body.idTema,
                         interes: body.interes,
                         complejidad: body.complejidad,
                         entendimiento: body.entendimiento,
                         valoracion: body.valoracion,
                         observaciones: body.observaciones,
                    });

               return await getManager()
                    .getRepository(Puntajes)
                    .save(nuevoPuntaje);
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincronico que permite modificar los datos de un puntaje pasando como
      * parametros el idAlumno, el idProfesor y el idTema, y los datos a modificar en
      * el body del request.
      * Utiliza getRepository para la consulta a la base de datos
      * @param idAlumno
      * @param idProfesor
      * @param idTema
      * @param body
      * @returns
      */
     public async modificarPuntajeConGR(
          idAlumno: number,
          idProfesor: number,
          idTema: number,
          body: Puntajes
     ): Promise<Puntajes> {
          try {
               const puntaje = await getManager()
                    .getRepository(Puntajes)
                    .findOne({
                         where: {
                              idAlumno,
                              idProfesor,
                              idTema,
                         },
                    });

               if (puntaje) {
                    const puntajeActualizado = await getManager()
                         .getRepository(Puntajes)
                         .merge(puntaje, {
                              idAlumno,
                              idProfesor,
                              idTema,
                              interes: body.interes,
                              complejidad: body.complejidad,
                              entendimiento: body.entendimiento,
                              valoracion: body.valoracion,
                              observaciones: body.observaciones,
                         });

                    return await getManager()
                         .getRepository(Puntajes)
                         .save(puntajeActualizado);
               } else {
                    return null;
               }
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      *
      * @param cuil
      * @returns
      */
     public async obtenerPuntajesPorCuilConGR(
          cuil: string
     ): Promise<Puntajes[]> {
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
                    return await getManager()
                         .getRepository(Puntajes)
                         .find({
                              where: {
                                   idAlumno: alumno.idAlumno,
                              },
                         });
               } else {
                    return null;
               }
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     public async eliminarPuntajeConGR(body: Puntajes): Promise<boolean> {
          try {
               const puntaje = await getManager()
                    .getRepository(Puntajes)
                    .findOne({
                         relations: ["idAlumno2", "idProfesor2", "idTema2"],
                         where: {
                              idAlumno2: {
                                   idAlumno: body.idAlumno,
                              },
                              idProfesor2: {
                                   idProfesor: body.idProfesor,
                              },
                              idTema2: {
                                   idTema: body.idTema,
                              },
                         },
                    });

               if (puntaje) {
                    await getManager().getRepository(Puntajes).delete({
                         idPuntaje: puntaje.idPuntaje,
                         idAlumno: puntaje.idAlumno,
                         idProfesor: puntaje.idProfesor,
                         idTema: puntaje.idTema,
                    });

                    return true;
               }
          } catch (e) {
               console.error(e);
               return false;
          }
     }
}
