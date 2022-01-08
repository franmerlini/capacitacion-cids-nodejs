import { Container } from "inversify";
import Types from "./types/Types";
import { ITemasService } from "./interface/ITemasService";
import { TemasService } from "./TemasService";
import { IAlumnosService } from "./interface/IAlumnosService";
import { AlumnosService } from "./AlumnosService";
import { IPuntajesService } from "./interface/IPuntajesService";
import { PuntajesService } from "./PuntajesService";
import { IProfesoresService } from "./interface/IProfesoresService";
import { ProfesoresService } from "./ProfesoresService";
import { ReparticionesService } from "./ReparticionesService";
import { IReparticionesService } from "./interface/IReparticionesService";
import { ICargosService } from "./interface/ICargosService";
import { CargosService } from "./CargosService";

const container = new Container();

container.bind<ITemasService>(Types.Tema).to(TemasService);
container.bind<IAlumnosService>(Types.Alumno).to(AlumnosService);
container.bind<IPuntajesService>(Types.Puntaje).to(PuntajesService);
container.bind<IProfesoresService>(Types.Profesor).to(ProfesoresService);
container
     .bind<IReparticionesService>(Types.Reparticion)
     .to(ReparticionesService);
container.bind<ICargosService>(Types.Cargo).to(CargosService);

export default container;
