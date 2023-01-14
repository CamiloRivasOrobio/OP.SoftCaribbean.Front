import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataMaestra } from 'src/app/models/data-maestra';
import { Maestras } from 'src/app/models/maestras';
import { Response } from 'src/app/models/response';
import { MaestrasService } from 'src/app/services/maestras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maestras-form',
  templateUrl: './maestras-form.component.html',
  styleUrls: ['./maestras-form.component.scss']
})
export class MaestrasFormComponent implements OnInit {
  public modificar: number = 0;
  public loading: boolean = true;
  public form: any = FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private maestrasService: MaestrasService,
    public dialog: MatDialog,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nmmaestro: ['', Validators.required],
      cdmaestro: ['', Validators.required],
      dsmaestro: ['', Validators.required],
      feregistro: [''],
      febaja: [''],
    });
    this.loading = false;
    if (this.data.id != 0 && this.data.type != 0) {
      this.modificar = 2;
      this.maestrasService.GetById(this.data.id).subscribe((data: Response) => { this.CargarDatosMaestra(data.data); this.loading = false; });
    }
    else if (this.data.id != 0 && this.data.type != 1) {
      this.modificar = 1;
      this.maestrasService.GetById(this.data.id).subscribe((data: Response) => { this.CargarDatosMaestra(data.data); this.loading = false; });
    }
  }
  onSubmit(type: number) {
    this.loading = true;
    if (type === 0) {
      this.maestrasService.Post(this.form.value).subscribe((data: any) => {
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
      this.maestrasService.Put(this.form.value).subscribe((data: any) => {
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
  CargarDatosMaestra(data: Maestras) {
    this.form.get('nmmaestro').setValue(data.nmmaestro);
    this.form.get('cdmaestro').setValue(data.cdmaestro);
    this.form.get('dsmaestro').setValue(data.dsmaestro);
    this.form.get('febaja').setValue(data.febaja);
    this.form.get('feregistro').setValue(data.feregistro);
  }
}