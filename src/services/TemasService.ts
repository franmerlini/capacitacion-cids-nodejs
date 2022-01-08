import { injectable } from "inversify";
import { getManager } from "typeorm";
import { Temas } from "../entities/Temas";
import { TemasModel } from "../models/TemasModel";
import { plainToClass } from "class-transformer";
import { ITemasService } from "./interface/ITemasService";

@injectable()
export class TemasService implements ITemasService {
     constructor() {}

     /**
      * Metodo asincronico que devuelve un listado de todos los temas con todos sus datos.
      * Utiliza getRepository para la consulta a la base de datos
      * @returns arreglo de Temas
      */
     public async obtenerTemasConQB(): Promise<Temas[]> {
          try {
               const t: any = await getManager()
                    .createQueryBuilder(Temas, "t")
                    .addSelect("t.idTema", "id")
                    .addSelect("t.nombre", "nombre")
                    .addSelect("t.descripcion", "descripcion")
                    .addSelect("t.duracion", "duracion")
                    .orderBy("t.idTema", "DESC")
                    .getRawMany();
               return t;
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     /**
      * Metodo asincronico que devuelve un tema con todos sus datos pasando por parametro su id.
      * Utiliza getRepository para la consulta a la base de datos
      * @param idTema
      * @returns
      */
     public async obtenerTemaConGR(idTema: number): Promise<Temas> {
          try {
               return await getManager().getRepository(Temas).findOne(idTema);
          } catch (e) {
               console.error(e);
               return null;
          }
     }

     async obtenerTemasConSP(): Promise<Temas[]> {
          throw new Error("");
     }

     /**
      * Metodo asincronico que devuelve un tema con todos sus datos pasando por parametro su id.
      * Utiliza store procedure para la consulta a la base de datos
      * @param idTema
      * @returns
      */
     async obtenerTemaConSP(idTema: number): Promise<TemasModel> {
          try {
               let resultado: TemasModel;
               await getManager()
                    .query(`CALL OBT_TEMAS(${idTema})`)
                    .then((x) => {
                         let result: TemasModel;
                         result = plainToClass(TemasModel, x[0], {
                              excludeExtraneousValues: true,
                         });
                         console.error(result);
                         resultado = result;
                    })
                    .catch((e) => {
                         console.log("No se encontraron registros.");
                    });
               return resultado;
          } catch (e) {
               console.error(e);
               return null;
          }
     }
}
