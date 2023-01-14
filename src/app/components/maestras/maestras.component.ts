import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Maestras } from 'src/app/models/maestras';
import { Response } from 'src/app/models/response';
import { DataService } from 'src/app/services/data.service';
import { MaestrasService } from 'src/app/services/maestras.service';
import Swal from 'sweetalert2';
import { DataMaestraComponent } from '../data-maestra/data-maestra.component';
import { MaestrasFormComponent } from './maestras-form/maestras-form.component';

@Component({
  selector: 'app-maestras',
  templateUrl: './maestras.component.html',
  styleUrls: ['./maestras.component.scss']
})
export class MaestrasComponent implements OnInit {
  @Output() item = new EventEmitter<string>();
  @ViewChild('dtcomponent', { static: false }) dtcomponent: DataMaestraComponent;
  public loading: boolean = true;
  public maestras: Maestras[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  public selectedId: string = "";
  constructor(private maestrasService: MaestrasService, public dialog: MatDialog, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.Get();
  }
  ChangePage(event: any) {
    this.loading = true;
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.Get();
  }
  Get() {
    this.maestrasService.Get({ PageNumber: this.pageNumber + 1, PageSize: this.pageSize }).subscribe((data: Response) => {
      this.maestras = data.data;
      this.pageSize = data.pageSize;
      this.totalItems = data.totalItems;
      this.loading = false;
    });
  }
  DeletePeople(id: string) {
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
        this.maestrasService.Delete(id).subscribe((data: any) => {
          Swal.fire(
            'Se ha eliminado!',
            data.message,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.Get();
            }
          });
        });
      }
    })

  }
  OpenFormDialog(id: string, type: number) {
    if (id != '' && type == 0)
      this.dialog.open(MaestrasFormComponent, { data: { id: id, type: type } });
    else if (id != '' && type == 1)
      this.dialog.open(MaestrasFormComponent, { data: { id: id, type: type } });
    else
      this.dialog.open(MaestrasFormComponent, { data: { id: 0, type: type } });
  }
  SeletedItem(id: string) {
    this.selectedId = id;
    this.dataService.mastraId$.emit(id);
  }
}