export interface ITemasService {
     obtenerTemasConQB(): Promise<any>;

     obtenerTemaConGR(idTema: number): Promise<any>;

     obtenerTemasConSP(): Promise<any>;

     obtenerTemaConSP(idTema: number): Promise<any>;
}
