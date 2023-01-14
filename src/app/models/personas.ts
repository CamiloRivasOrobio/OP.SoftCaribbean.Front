import { DataMaestra } from "./data-maestra";

export interface Personas {
    nmid: number;
    cddocumento: string;
    dsnombres: string;
    dsapellidos: string;
    fenacimiento: Date;
    cdtipo: string;
    cdgenero: string;
    cdusuario: string;
    dsdireccion: string;
    dsphoto: string;
    cdtelefonoFijo: string;
    cdtelefonoMovil: string;
    dsemail: string;
    feregistro: Date;
    febaja: Date;
    documentoNavigation: DataMaestra;
    tipoNavigation: DataMaestra;
    generoNavigation: DataMaestra;
}
