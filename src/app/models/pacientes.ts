import { Personas } from "./personas";

export interface Pacientes {
    nmid: number;
    nmidPersona: number;
    nmidMedicotra: number;
    dseps: string;
    dsarl: string;
    cdusuario: string;
    dscondicion: string;
    feregistro: Date;
    febaja: Date;
    personaNavigation: Personas;
    medicoNavigation: Personas;
}
