import { Component, OnInit, Input, EventEmitter, OnDestroy, ViewChild, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataMaestra } from 'src/app/models/data-maestra';
import { Response } from 'src/app/models/response';
import { DataMaestraService } from 'src/app/services/data-maestra.service';
import Swal from 'sweetalert2';
import { DataMaestraFormComponent } from './data-maestra-form/data-maestra-form.component';
import { Observable, Subscription } from 'rxjs';
import { MaestrasComponent } from '../maestras/maestras.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-maestra',
  templateUrl: './data-maestra.component.html',
  styleUrls: ['./data-maestra.component.scss']
})
export class DataMaestraComponent implements OnInit {
  public loading: boolean = true;
  public dataMaestra: DataMaestra[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  public id: string = "";
  constructor(private maestrasService: DataMaestraService, public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
    this.loading = false;
    this.dataService.mastraId$.subscribe((text: string) => {
      this.id = text;
      this.Get(text);
    });
  }
  ChangePage(event: any) {
    this.loading = true;
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.Get();
  }
  Get(id?: string) {
    this.maestrasService.Get({ PageNumber: this.pageNumber + 1, PageSize: this.pageSize, nmmaestro: id }).subscribe((data: Response) => {
      this.dataMaestra = data.data;
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
      this.dialog.open(DataMaestraFormComponent, { data: { id: id, type: type } });
    else if (id != '' && type == 1)
      this.dialog.open(DataMaestraFormComponent, { data: { id: id, type: type } });
    else
      this.dialog.open(DataMaestraFormComponent, { data: { id: 0, type: type, maestra: this.id } });
  }
}