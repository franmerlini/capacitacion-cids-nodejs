import { Request, Response } from "express";
import container from "../services/inversify.config";
import Types from "../services/types/types";
import { ERROR } from "../../HttpErrorCodes";
import { CargosService } from "../services/CargosService";

let _cargosService = container.get<CargosService>(Types.Cargo);

export async function obtenerCargosConGR(req: Request, res: Response) {
     try {
          const result = await _cargosService.obtenerCargosConGR();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export const CargosController = {
     obtenerCargosConGR,
};
