import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataMaestra } from 'src/app/models/data-maestra';
import { Response } from 'src/app/models/response';
import { DataMaestraService } from 'src/app/services/data-maestra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-maestra-form',
  templateUrl: './data-maestra-form.component.html',
  styleUrls: ['./data-maestra-form.component.scss']
})
export class DataMaestraFormComponent implements OnInit {
  public modificar: number = 0;
  public loading: boolean = true;
  public form: any = FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private dataMaestraService: DataMaestraService,
    public dialog: MatDialog,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nmdato: ['', Validators.required],
      nmmaestro: [''],
      cddato: ['', Validators.required],
      dsddato: ['', Validators.required],
      cddato1: [''],
      cddato2: [''],
      cddato3: [''],
      feregistro: [''],
      febaja: [''],
    });
    this.loading = false;
    if (this.data.id != 0 && this.data.type != 0) {
      this.modificar = 2;
      this.dataMaestraService.GetById(this.data.id).subscribe((data: Response) => { this.CargarDatosMaestra(data.data); this.loading = false; });
    }
    else if (this.data.id != 0 && this.data.type != 1) {
      this.modificar = 1;
      this.dataMaestraService.GetById(this.data.id).subscribe((data: Response) => { this.CargarDatosMaestra(data.data); this.loading = false; });
    }
    else {
      this.form.get('nmmaestro').setValue(this.data.maestra);
    }
  }
  onSubmit(type: number) {
    this.loading = true;
    if (type === 0) {
      this.dataMaestraService.Post(this.form.value).subscribe((data: any) => {
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
      this.dataMaestraService.Put(this.form.value).subscribe((data: any) => {
        this.loading = false;
        Swal.fire(
          'Se ha modificado!',
          data.message,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
          }
        });
      });
    }
  }
  CargarDatosMaestra(data: DataMaestra) {
    this.form.get('nmdato').setValue(data.nmdato);
    this.form.get('nmmaestro').setValue(data.nmmaestro);
    this.form.get('cddato').setValue(data.cddato);
    this.form.get('dsddato').setValue(data.dsddato);
    this.form.get('cddato1').setValue(data.cddato1);
    this.form.get('cddato2').setValue(data.cddato2);
    this.form.get('cddato3').setValue(data.cddato3);
    this.form.get('febaja').setValue(data.febaja);
    this.form.get('feregistro').setValue(data.feregistro);
  }
}