import { injectable } from "inversify";
import { getManager } from "typeorm";
import { Cargos } from "../entities/Cargos";
import { ICargosService } from "./interface/ICargosService";

@injectable()
export class CargosService implements ICargosService {
     constructor() {}

     /**
      * Metodo asincronico que devuelve un listado de todos los cargos.
      * Utiliza getRepository para la consulta a la base de datos
      * @returns
      */
     public async obtenerCargosConGR(): Promise<Cargos[]> {
          try {
               return await getManager().getRepository(Cargos).find();
          } catch (e) {
               console.error(e);
               return null;
          }
     }
}
