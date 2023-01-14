import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/models/pacientes';
import { Response } from 'src/app/models/response';
import { PacientesService } from 'src/app/services/pacientes.service';
// import { PacientesFormComponent } from '../pacientes/pacientes-form/pacientes-form.component';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PacientesFormComponent } from './pacientes-form/pacientes-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  public loading: boolean = true;
  public pacientes: Pacientes[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  public id: any = this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private pacientesService: PacientesService, public dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetPeople();
  }
  ChangePage(event: any) {
    this.loading = true;
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.GetPeople();
  }
  GetPeople() {
    this.pacientesService.Get({ PageNumber: this.pageNumber + 1, PageSize: this.pageSize }).subscribe((data: Response) => {
      this.pacientes = data.data;
      this.pageSize = data.pageSize;
      this.totalItems = data.totalItems;
      this.loading = false;
    });
  }
  DeletePeople(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "no podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesService.Delete(id).subscribe((data: any) => {
          Swal.fire(
            'Se ha eliminado!',
            data.message,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.GetPeople();
            }
          });
        });

      }
    })

  }
  OpenFormDialog(id: number, type: number) {
    if (id > 0 && type == 0)
      this.dialog.open(PacientesFormComponent, { data: { id: id, type: type } });
    else if (id > 0 && type == 1)
      this.dialog.open(PacientesFormComponent, { data: { id: id, type: type } });
    else
      this.dialog.open(PacientesFormComponent, { data: { id: 0, type: type } });
  }
}