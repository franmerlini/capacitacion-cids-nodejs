import { Request, Response } from "express";
import container from "../services/inversify.config";
import { AlumnosService } from "../services/AlumnosService";
import Types from "../services/types/Types";
import { ERROR } from "../../HttpErrorCodes";
import { Alumnos } from "../entities/Alumnos";

let _alumnosService = container.get<AlumnosService>(Types.Alumno);

export async function obtenerAlumnosConQB(req: Request, res: Response) {
     try {
          const result = await _alumnosService.obtenerAlumnosConQB();

          if (result.length) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.NotFound).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function obtenerAlumnoPorCUILConGR(req: Request, res: Response) {
     try {
          const result = await _alumnosService.obtenerAlumnoPorCUILConGR(
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

export async function crearAlumnoConGR(req: Request, res: Response) {
     try {
          const result = await _alumnosService.crearAlumnoConGR(req.body);

          if (result instanceof Alumnos) {
               return res.status(ERROR.Ok).json(result);
          } else {
               return res.status(ERROR.Conflict).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function eliminarAlumnoConGR(req: Request, res: Response) {
     try {
          const result = await _alumnosService.eliminarAlumnoConGR(
               req.params.cuil
          );

          if (result) {
               return res.status(ERROR.Ok).json(result);
          }
     } catch (e) {
          return res.status(ERROR.Conflict).json(e);
     }
}

export async function modificarAlumnoConGR(req: Request, res: Response) {
     try {
          const result = await _alumnosService.modificarAlumnoConGR(
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

export const AlumnosController = {
     obtenerAlumnosConQB,
     obtenerAlumnoPorCUILConGR,
     crearAlumnoConGR,
     eliminarAlumnoConGR,
     modificarAlumnoConGR,
};
