import { ProfesoresService } from "../services/ProfesoresService";
import { Request, Response } from "express";
import container from "../services/inversify.config";
import Types from "../services/types/types";
import { ERROR } from "../HttpErrorCodes";
import { Profesores } from "../entities/Profesores";

let _profesoresService = container.get<ProfesoresService>(Types.Profesor);

export async function obtenerProfesoresConQB(req: Request, res: Response) {
     try {
          const result = await _profesoresService.obtenerProfesoresConQB();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerProfesoresTitularesConQB(
     req: Request,
     res: Response
) {
     try {
          const result =
               await _profesoresService.obtenerProfesoresTitularesConQB();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerProfesoresMayoresAEdadConQB(
     req: Request,
     res: Response
) {
     try {
          const result =
               await _profesoresService.obtenerProfesoresMayoresAEdadConQB(
                    +req.params.edad
               );

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function eliminarProfesorConSP(req: Request, res: Response) {
     try {
          const result = await _profesoresService.eliminarProfesorConSP(
               req.params.cuil
          );

          if (result) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function modificarProfesorConGR(req: Request, res: Response) {
     try {
          const result = await _profesoresService.modificarProfesorConGR(
               req.params.cuil,
               req.body
          );

          if (result) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function crearProfesorConGR(req: Request, res: Response) {
     try {
          const result = await _profesoresService.crearProfesorConGR(req.body);

          if (result instanceof Profesores) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.Conflict).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export const ProfesoresController = {
     obtenerProfesoresConQB,
     obtenerProfesoresTitularesConQB,
     obtenerProfesoresMayoresAEdadConQB,
     eliminarProfesorConSP,
     modificarProfesorConGR,
     crearProfesorConGR,
};
