import { Request, Response } from "express";
import container from "../services/inversify.config";
import Types from "../services/types/types";
import { ERROR } from "../../HttpErrorCodes";
import { ReparticionesService } from "../services/ReparticionesService";

let _reparticionesService = container.get<ReparticionesService>(
     Types.Reparticion
);

export async function obtenerReparticionesConGR(req: Request, res: Response) {
     try {
          const result =
               await _reparticionesService.obtenerReparticionesConGR();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export const ReparticionesController = {
     obtenerReparticionesConGR,
};
