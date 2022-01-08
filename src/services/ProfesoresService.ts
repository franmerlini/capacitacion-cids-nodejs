import { injectable } from "inversify";
import { Profesores } from "../entities/Profesores";
import { IProfesoresService } from "./interface/IProfesoresService";
import { getConnection, getManager, Tree } from "typeorm";
import { Personas } from "../entities/Personas";

@injectable()
export class ProfesoresService implements IProfesoresService {
     constructor() {}

     public async obtenerProfesoresConQB(): Promise<Profesores[]> {
          try {
               return await getManager()
                    .createQueryBuilder(Profesores, "prof")
                    .leftJoinAndSelect("prof.idPersona2", "pers")
                    .leftJoinAndSelect("prof.idCargo2", "c")
                    .select([
                         "prof.idProfesor as idProfesor",
                         "pers.nombre as nombre",
                         "pers.apellido as apellido",
                         "pers.cuil as cuil",
                         "pers.edad as edad",
                         "c.nombre as cargo",
                         "c.idCargo as idCargo",
                    ])
                    .getRawMany();
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincronico que devuelve todos los profesores con cargo "Titular"
      * Utiliza queryBuilder para la consulta a la base de datos
      * @returns arreglo de Profesores
      */
     public async obtenerProfesoresTitularesConQB(): Promise<Profesores[]> {
          try {
               return await getConnection()
                    .createQueryBuilder()
                    .select("p")
                    .from(Profesores, "p")
                    .where("p.id_cargo = :id", { id: 1 })
                    .getMany();
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincronico que devuelve todos los profesores mayores a una edad pasada por parametro.
      * Utiliza queryBuilder para la consulta a la base de datos
      * @param edad
      * @returns
      */
     public async obtenerProfesoresMayoresAEdadConQB(
          edad: number
     ): Promise<Profesores[]> {
          try {
               return await getManager()
                    .createQueryBuilder(Profesores, "prof")
                    .leftJoinAndSelect(
                         Personas,
                         "pers",
                         "prof.idPersona = pers.idPersona"
                    )
                    .where("pers.edad > :edad", { edad })
                    .getMany();
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     public async crearProfesorConGR(body: Profesores): Promise<any> {
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

               const nuevoProfesor = await getManager()
                    .getRepository(Profesores)
                    .create({
                         idCargo: body.idCargo,
                         idPersona: personaCreada.idPersona,
                    });

               return await getManager()
                    .getRepository(Profesores)
                    .save(nuevoProfesor);
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     public async eliminarProfesorConSP(cuil: string): Promise<boolean> {
          try {
               await getManager().query(`CALL DEL_PROFESORES(${cuil});`);
               return true;
          } catch (err) {
               console.error(err);
               return false;
          }
     }

     /**
      *
      * @param cuil
      * @param body
      * @returns
      */
     public async modificarProfesorConGR(
          cuil: string,
          body: Profesores
     ): Promise<Profesores> {
          try {
               const profesor = await getManager()
                    .getRepository(Profesores)
                    .findOne({
                         relations: ["idPersona2"],
                         where: {
                              idPersona2: {
                                   cuil,
                              },
                         },
                    });

               if (profesor) {
                    const persona = await getManager()
                         .getRepository(Personas)
                         .findOne(profesor.idPersona);

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

                    const profesorActualizado = await getManager()
                         .getRepository(Profesores)
                         .merge(profesor, {
                              idCargo: body.idCargo,
                              idPersona: personaActualizada.idPersona,
                         });

                    return await getManager()
                         .getRepository(Profesores)
                         .save(profesorActualizado);
               } else {
                    return null;
               }
          } catch (e) {
               console.error(e);
               return null;
          }
     }
}
