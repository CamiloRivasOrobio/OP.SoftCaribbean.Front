import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/models/personas';
import { Response } from 'src/app/models/response';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonasFormComponent } from './personas-form/personas-form.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  public loading: boolean = true;
  public personas: Personas[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  constructor(private personasService: PersonasService, public dialog: MatDialog) { }

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
    this.personasService.Get({ PageNumber: this.pageNumber + 1, PageSize: this.pageSize }).subscribe((data: Response) => {
      this.personas = data.data;
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
        this.personasService.Delete(id).subscribe((data: any) => {
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
      this.dialog.open(PersonasFormComponent, { data: { id: id, type: type } });
    else if (id > 0 && type == 1)
      this.dialog.open(PersonasFormComponent, { data: { id: id, type: type } });
    else
      this.dialog.open(PersonasFormComponent, { data: { id: 0, type: type } });
  }
}