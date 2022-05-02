import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { ApiService } from './services/api.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'test';

  displayedColumns: string[] = ['Nombre', 'Descripción', 'Precio', 'Cantidad', 'Acción'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private service: ApiService){}
  ngOnInit(): void {
    this.getData();
  }

  
    openDialog() {
      this.dialog.open(DialogComponent, {
        width: '30%'
      }).afterClosed().subscribe(val=>{
        if(val === 'save'){
          this.getData();
        }
      })
    }
  

  getData(){
    this.service.getData().subscribe({
      next: (res)=>{   
        console.log(`Data:`);
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.error(err)
      }
    })
  }

  editProduct(data: object){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: data
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getData();
      }
    })
  }

  deleteProduct(id: number){
    this.service.deleteProduct(id).subscribe({
      next: (res)=>{
        console.log('Deleted!');
        this.getData();
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
