import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataMaestra } from 'src/app/models/data-maestra';
import { Pacientes } from 'src/app/models/pacientes';
import { Personas } from 'src/app/models/personas';
import { Response } from 'src/app/models/response';
import { DataMaestraService } from 'src/app/services/data-maestra.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { PersonasService } from 'src/app/services/personas.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.scss']
})
export class PacientesFormComponent implements OnInit {
  public modificar: number = 0;
  public loading: boolean = true;
  public form: any = FormGroup;
  public personas: Personas[] = [];
  public medicos: Personas[] = [];
  public sexos: DataMaestra[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private pacientesService: PacientesService,
    private personasService: PersonasService,
    private dataMaestraService: DataMaestraService,
    public dialog: MatDialog,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.CargarListas();
    this.form = this.formBuilder.group({
      nmid: [0],
      nmidPersona: ['', Validators.required],
      nmidMedicotra: ['', Validators.required],
      dseps: [''],
      dsarl: [''],
      cdusuario: [''],
      dscondicion: [''],
      feregistro: [''],
      febaja: [''],
    });
    if (this.data.id != 0 && this.data.type != 0) {
      this.modificar = 2;
      this.pacientesService.GetById(this.data.id).subscribe((data: Response) => this.CargarDatosPersona(data.data));
    }
    else if (this.data.id != 0 && this.data.type != 1) {
      this.modificar = 1;
      this.pacientesService.GetById(this.data.id).subscribe((data: Response) => this.CargarDatosPersona(data.data));
    }
  }
  onSubmit(type: number) {
    this.loading = true;
    console.log(JSON.stringify(this.form.value));
    if (type === 0) {
      this.pacientesService.Post(this.form.value).subscribe((data: any) => {
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
      this.pacientesService.Put(this.form.value).subscribe((data: any) => {
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
  CargarDatosPersona(data: Pacientes) {
    this.form.get('nmid').setValue(data.nmid);
    this.form.get('nmidPersona').setValue(data.nmidPersona);
    this.form.get('nmidMedicotra').setValue(data.nmidMedicotra);
    this.form.get('dseps').setValue(data.dseps);
    this.form.get('dsarl').setValue(data.dsarl);
    this.form.get('cdusuario').setValue(data.cdusuario);
    this.form.get('dscondicion').setValue(data.dscondicion);
    this.form.get('febaja').setValue(data.febaja);
    this.form.get('feregistro').setValue(data.feregistro);
  }
  CargarListas() {
    this.personasService.Get({ PageNumber: 1, PageSize: 100, cdtipo: environment.rolPaciente }).subscribe((data: Response) => {
      this.personas = data.data;
      this.personasService.Get({ PageNumber: 1, PageSize: 100, cdtipo: environment.rolPaciente }).subscribe((data: Response) => {
        this.medicos = data.data;
        this.loading = false;
      });
    });
  }
}