export interface IProfesoresService {
     obtenerProfesoresConQB(): Promise<any>;

     obtenerProfesoresTitularesConQB(): Promise<any>;

     obtenerProfesoresMayoresAEdadConQB(edad: number): Promise<any>;

     crearProfesorConGR(body: any): Promise<any>;

     eliminarProfesorConSP(cuil: string): Promise<any>;

     modificarProfesorConGR(cuil: string, body: any): Promise<any>;
}
