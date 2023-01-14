import { Personas } from "./personas";

export interface ReportePaciente {
    nmid: number;
    nmidPersona: number;
    dsPersona: string;
    nmidMedicotra: number;
    dsMedico: string;
    dseps: string;
    dsarl: string;
    cdusuario: string;
    dscondicion: string;
    feregistro: Date;
    febaja: Date;
}
