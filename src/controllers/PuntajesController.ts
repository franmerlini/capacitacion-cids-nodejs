import { Request, Response } from "express";
import container from "../services/inversify.config";
import { PuntajesService } from "../services/PuntajesService";
import Types from "../services/types/types";
import { ERROR } from "../../HttpErrorCodes";
import { body } from "express-validator";

let _puntajesService = container.get<PuntajesService>(Types.Puntaje);

export async function obtenerPuntajesConQB(req: Request, res: Response) {
     try {
          const result = await _puntajesService.obtenerPuntajesConQB();

          if (result != null) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerPuntajesConGR(req: Request, res: Response) {
     try {
          const result = await _puntajesService.obtenerPuntajesConGR();

          if (result != null) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function registrarPuntajeConGR(req: Request, res: Response) {
     try {
          const result = await _puntajesService.registrarPuntajeConGR(req.body);

          if (result != null) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function modificarPuntajeConGR(req: Request, res: Response) {
     try {
          const result = await _puntajesService.modificarPuntajeConGR(
               +req.params.idAlumno,
               +req.params.idProfesor,
               +req.params.idTema,
               req.body
          );
          if (result != null) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerPuntajesPorCuilConGR(req: Request, res: Response) {
     try {
          const result = await _puntajesService.obtenerPuntajesPorCuilConGR(
               req.params.cuil
          );
          if (result) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function eliminarPuntajeConGR(req: Request, res: Response) {
     try {
          const result = await _puntajesService.eliminarPuntajeConGR(req.body);

          if (result) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export const PuntajesController = {
     obtenerPuntajesConGR,
     obtenerPuntajesConQB,
     registrarPuntajeConGR,
     modificarPuntajeConGR,
     obtenerPuntajesPorCuilConGR,
     eliminarPuntajeConGR,
};
