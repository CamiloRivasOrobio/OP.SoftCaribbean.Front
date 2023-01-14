import { PacientesService } from 'src/app/services/pacientes.service';
import { PersonasService } from 'src/app/services/personas.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pacientes } from 'src/app/models/pacientes';
import { DataMaestraService } from 'src/app/services/data-maestra.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/models/response';
import { DataMaestra } from 'src/app/models/data-maestra';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Personas } from 'src/app/models/personas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personas-form',
  templateUrl: './personas-form.component.html',
  styleUrls: ['./personas-form.component.scss']
})
export class PersonasFormComponent implements OnInit {
  public modificar: number = 0;
  public loading: boolean = true;
  public form: any = FormGroup;
  public documentos: DataMaestra[] = [];
  public tipopersonas: DataMaestra[] = [];
  public sexos: DataMaestra[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private pacientesService: PacientesService,
    private personasService: PersonasService,
    private dataMaestraService: DataMaestraService,
    public dialog: MatDialog,
    public router: Router,
    public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.CargarListas();
    this.form = this.formBuilder.group({
      nmid: ['', Validators.required],
      cddocumento: ['', Validators.required],
      dsnombres: ['', Validators.required],
      dsapellidos: ['', Validators.required],
      fenacimiento: ['', Validators.required],
      cdtipo: ['', Validators.required],
      cdgenero: ['', Validators.required],
      dsdireccion: [''],
      cdusuario: ['', Validators.required],
      cdtelefonoFijo: ['', Validators.pattern("^[0-9]*$")],
      cdtelefonoMovil: ['', Validators.pattern("^[0-9]*$")],
      dsemail: ['', Validators.email],
      feregistro: [''],
      febaja: [''],
    });
    if (this.data.id != 0 && this.data.type != 0) {
      this.modificar = 2;
      this.personasService.GetById(this.data.id).subscribe((data: Response) => this.CargarDatosPersona(data.data));
    }
    else if (this.data.id != 0 && this.data.type != 1) {
      this.modificar = 1;
      this.personasService.GetById(this.data.id).subscribe((data: Response) => this.CargarDatosPersona(data.data));
    }
  }
  onSubmit(type: number) {
    this.loading = true;
    if (type === 0) {
      this.personasService.Post(this.form.value).subscribe((data: any) => {
        this.loading = false;
        Swal.fire(
          'Se ha registrado!',
          data.message,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
    } else {
      this.personasService.Put(this.form.value).subscribe((data: any) => {
        this.loading = false;
        Swal.fire(
          'Se ha modificado!',
          data.message,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
    }
  }
  CargarDatosPersona(data: Personas) {
    // this.form.setValue(data),
    this.form.get('nmid').setValue(data.nmid);
    this.form.get('cddocumento').setValue(data.cddocumento);
    this.form.get('dsnombres').setValue(data.dsnombres);
    this.form.get('dsapellidos').setValue(data.dsapellidos);
    this.form.get('fenacimiento').setValue(this.datepipe.transform(data.fenacimiento, 'yyyy-MM-dd'));
    this.form.get('cdtipo').setValue(data.cdtipo);
    this.form.get('cdgenero').setValue(data.cdgenero);
    this.form.get('dsdireccion').setValue(data.dsdireccion);
    this.form.get('cdusuario').setValue(data.cdusuario);
    this.form.get('cdtelefonoFijo').setValue(data.cdtelefonoFijo);
    this.form.get('cdtelefonoMovil').setValue(data.cdtelefonoMovil);
    this.form.get('dsemail').setValue(data.dsemail);
    this.form.get('febaja').setValue(data.febaja);
    this.form.get('cdusuario').setValue(data.cdusuario);
  }
  CargarListas() {
    this.dataMaestraService.Get({ nmmaestro: 'TipoDocumento', PageNumber: 1, PageSize: 20 }).subscribe((data: Response) => {
      this.documentos = data.data;
      this.dataMaestraService.Get({ nmmaestro: 'TipoPersona', PageNumber: 1, PageSize: 20 }).subscribe((data: Response) => {
        this.tipopersonas = data.data;
        this.dataMaestraService.Get({ nmmaestro: 'Sexo', PageNumber: 1, PageSize: 20 }).subscribe((data: Response) => {
          this.sexos = data.data;
          this.loading = false;
        });
      });
    });
  }
}