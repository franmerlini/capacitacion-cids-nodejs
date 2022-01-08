import { injectable } from "inversify";
import { getManager } from "typeorm";
import { Reparticiones } from "../entities/Reparticiones";
import { IReparticionesService } from "./interface/IReparticionesService";

@injectable()
export class ReparticionesService implements IReparticionesService {
     constructor() {}

     /**
      * Metodo asincronico que devuelve un listado de todos las reparticiones.
      * Utiliza getRepository para la consulta a la base de datos
      * @returns
      */
     public async obtenerReparticionesConGR(): Promise<Reparticiones[]> {
          try {
               return await getManager().getRepository(Reparticiones).find();
          } catch (e) {
               console.error(e);
               return null;
          }
     }
}
