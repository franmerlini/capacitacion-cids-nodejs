export interface IAlumnosService {
     obtenerAlumnosConGR(): Promise<any>;

     obtenerAlumnosConQB(): Promise<any>;

     obtenerAlumnoPorCUILConGR(cuil: string): Promise<any>;

     crearAlumnoConGR(body: any): Promise<any>;

     eliminarAlumnoConGR(cuil: string): Promise<any>;

     modificarAlumnoConGR(cuil: string, body: any): Promise<any>;
}
