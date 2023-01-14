import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public idItem: string = "";
  constructor() { }

  ngOnInit(): void {
  }
  SelectedItem(id: any){
    this.idItem = id;
  }
}
