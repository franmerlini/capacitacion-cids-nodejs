import { AlumnosController } from "./src/controllers/AlumnosController";
import { CargosController } from "./src/controllers/CargosController";
import { ProfesoresController } from "./src/controllers/ProfesoresController";
import { PuntajesController } from "./src/controllers/PuntajesController";
import { ReparticionesController } from "./src/controllers/ReparticionesController";
import { TemasController } from "./src/controllers/TemasController";
import { Schema } from "./src/middlewares/ValidationSchema";

export const AppRoutes = [
     {
          path: "/obtenerTemasConGR",
          method: "get",
          action: TemasController.obtenerTemasConQB,
          schema: Schema.obtenerTemasConGR,
     },
     {
          path: "/obtenerTemaConGR/:id",
          method: "get",
          action: TemasController.obtenerTemaConGR,
          schema: Schema.obtenerTemaConGR,
     },
     {
          path: "/obtenerTemasConSP",
          method: "get",
          action: TemasController.obtenerTemasConSP,
          schema: Schema.obtenerTemasConSP,
     },
     {
          path: "/obtenerTemaConSP/:id",
          method: "get",
          action: TemasController.obtenerTemaConSP,
          schema: Schema.obtenerTemaConSP,
     },
     {
          path: "/obtenerAlumnosConQB",
          method: "get",
          action: AlumnosController.obtenerAlumnosConQB,
          schema: Schema.obtenerAlumnosConGR,
     },
     {
          path: "/obtenerAlumnoPorCUILConGR/:cuil",
          method: "get",
          action: AlumnosController.obtenerAlumnoPorCUILConGR,
          schema: Schema.obtenerAlumnoPorCUILConGR,
     },
     {
          path: "/crearAlumnoConGR",
          method: "post",
          action: AlumnosController.crearAlumnoConGR,
          schema: Schema.crearAlumnoConGR,
     },
     {
          path: "/eliminarAlumnoConGR/:cuil",
          method: "delete",
          action: AlumnosController.eliminarAlumnoConGR,
          schema: Schema.eliminarAlumnoConGR,
     },
     {
          path: "/modificarAlumnoConGR/:cuil",
          method: "put",
          action: AlumnosController.modificarAlumnoConGR,
          schema: Schema.modificarAlumnoConGR,
     },
     {
          path: "/obtenerPuntajesConGR",
          method: "get",
          action: PuntajesController.obtenerPuntajesConGR,
          schema: Schema.obtenerPuntajesConGR,
     },
     {
          path: "/obtenerPuntajesConQB",
          method: "get",
          action: PuntajesController.obtenerPuntajesConQB,
          schema: Schema.obtenerPuntajesConQB,
     },
     {
          path: "/registrarPuntajeConGR",
          method: "post",
          action: PuntajesController.registrarPuntajeConGR,
          schema: Schema.registrarPuntajeConGR,
     },
     {
          path: "/modificarPuntajeConGR/:idAlumno/:idProfesor/:idTema",
          method: "put",
          action: PuntajesController.modificarPuntajeConGR,
          schema: Schema.modificarPuntajeConGR,
     },
     {
          path: "/obtenerPuntajesPorCuilConGR/:cuil",
          method: "get",
          action: PuntajesController.obtenerPuntajesPorCuilConGR,
          schema: Schema.obtenerPuntajesPorCuilConGR,
     },
     {
          path: "/eliminarPuntajeConGR/",
          method: "delete",
          action: PuntajesController.eliminarPuntajeConGR,
          schema: Schema.eliminarPuntajeConGR,
     },
     {
          path: "/obtenerProfesoresConQB",
          method: "get",
          action: ProfesoresController.obtenerProfesoresConQB,
          schema: Schema.obtenerProfesoresConQB,
     },
     {
          path: "/obtenerProfesoresTitularesConQB",
          method: "get",
          action: ProfesoresController.obtenerProfesoresTitularesConQB,
          schema: Schema.obtenerProfesoresTitularesConQB,
     },
     {
          path: "/obtenerProfesoresMayoresAEdadConQB/:edad",
          method: "get",
          action: ProfesoresController.obtenerProfesoresMayoresAEdadConQB,
          schema: Schema.obtenerProfesoresMayoresAEdadConQB,
     },
     {
          path: "/eliminarProfesorConSP/:cuil",
          method: "delete",
          action: ProfesoresController.eliminarProfesorConSP,
          schema: Schema.eliminarProfesorConSP,
     },
     {
          path: "/modificarProfesorConGR/:cuil",
          method: "put",
          action: ProfesoresController.modificarProfesorConGR,
          schema: Schema.modificarProfesorConGR,
     },
     {
          path: "/crearProfesorConGR",
          method: "post",
          action: ProfesoresController.crearProfesorConGR,
          schema: Schema.crearProfesorConGR,
     },
     {
          path: "/obtenerReparticionesConGR",
          method: "get",
          action: ReparticionesController.obtenerReparticionesConGR,
          schema: Schema.obtenerReparticionesConGR,
     },
     {
          path: "/obtenerCargosConGR",
          method: "get",
          action: CargosController.obtenerCargosConGR,
          schema: Schema.obtenerCargosConGR,
     },
];
