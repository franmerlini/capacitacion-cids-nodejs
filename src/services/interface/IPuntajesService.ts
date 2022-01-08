export interface IPuntajesService {
     obtenerPuntajesConGR(): Promise<any>;

     obtenerPuntajesConQB(): Promise<any>;

     registrarPuntajeConGR(body: any): Promise<any>;

     modificarPuntajeConGR(
          idAlumno: number,
          idProfesor: number,
          idTema: number,
          body: any
     ): Promise<any>;

     obtenerPuntajesPorCuilConGR(cuil: string): Promise<any>;

     eliminarPuntajeConGR(body: any): Promise<any>;
}
