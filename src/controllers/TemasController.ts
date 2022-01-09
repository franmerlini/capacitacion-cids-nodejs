import { Request, Response } from "express";
import container from "../services/inversify.config";
import { TemasService } from "../services/TemasService";
import Types from "../services/types/types";
import { ERROR } from "../../HttpErrorCodes";

let _temasService = container.get<TemasService>(Types.Tema);

export async function obtenerTemasConQB(req: Request, res: Response) {
     try {
          const result = await _temasService.obtenerTemasConQB();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerTemaConGR(req: Request, res: Response) {
     try {
          const result = await _temasService.obtenerTemaConGR(+req.params.id);

          if (result) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerTemasConSP(req: Request, res: Response) {
     try {
          const result = await _temasService.obtenerTemasConSP();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerTemaConSP(req: Request, res: Response) {
     try {
          const result = await _temasService.obtenerTemaConSP(+req.params.id);

          if (result) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export const TemasController = {
     obtenerTemasConQB,
     obtenerTemaConGR,
     obtenerTemaConSP,
     obtenerTemasConSP,
};
