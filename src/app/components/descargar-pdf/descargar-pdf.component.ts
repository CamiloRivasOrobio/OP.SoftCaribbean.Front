import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Pacientes } from 'src/app/models/pacientes';
import { ReportePaciente } from 'src/app/models/reportePaciente';
import { Response } from 'src/app/models/response';
import { ExcelService } from 'src/app/services/excel.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import * as XLSX from 'xlsx';

const doc = new jsPDF("portrait", "px", "a4");

@Component({
  selector: 'app-descargar-pdf',
  templateUrl: './descargar-pdf.component.html',
  styleUrls: ['./descargar-pdf.component.scss']
})
export class DescargarPdfComponent implements OnInit {
  public Data: Pacientes[];
  public loading: boolean = true;
  public columns = ["ID", "Paciente", "Medico", "EPS", "ARL", "Usuario", "Condición", "F. registro", "F. baja"];
  public rows: any = [{}];

  constructor(public pacientesService: PacientesService, public excelService: ExcelService) { }

  ngOnInit() {
    this.pacientesService.Get({ PageNumber: 1, PageSize: 10000 }).subscribe((data: Response) => {
      this.Data = data.data;
      for (let i = 0; i < data.data.length; i++) {
        this.rows.push({
          nmid: this.Data[i].nmid,
          nmidPersona: this.Data[i].personaNavigation.nmid + " - " + this.Data[i].personaNavigation.dsnombres
            + " " + this.Data[i].personaNavigation.dsapellidos,
          nmidMedicotra: this.Data[i].medicoNavigation.nmid + " - " + this.Data[i].medicoNavigation.dsnombres
            + " " + this.Data[i].medicoNavigation.dsapellidos,
          dseps: this.Data[i].dseps,
          dsarl: this.Data[i].dsarl,
          cdusuario: this.Data[i].cdusuario,
          dscondicion: this.Data[i].dscondicion,
          feregistro: this.Data[i].feregistro,
          febaja: this.Data[i].febaja
        });
      }
      this.loading = false;
    });
  }
  downloadPDF() {
    this.loading = true;
    autoTable(doc, {
      columnStyles: { europe: { halign: 'center' } }, // European countries centered
      body: this.rows,
      columns: [
        { header: 'ID', dataKey: 'nmid' },
        { header: 'Persona', dataKey: 'nmidPersona' },
        { header: 'Medico', dataKey: 'nmidMedicotra' },
        { header: 'EPS', dataKey: 'dseps' },
        { header: 'ARL', dataKey: 'dsarl' },
        { header: 'Usuario', dataKey: 'cdusuario' },
        { header: 'Condición', dataKey: 'dscondicion' },
        { header: 'F. registro', dataKey: 'feregistro' },
        { header: 'F. baja', dataKey: 'febaja' },
      ],
    });
    doc.save('paciente.pdf');
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  exportAsXLSX(): void {
    this.loading = true;
    this.excelService.exportAsExcelFile(this.rows, 'sample');
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}