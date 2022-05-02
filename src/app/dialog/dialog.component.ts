import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn: string='Guardar';
  categorys: any;
  constructor(private fb: FormBuilder, private service: ApiService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editProduct: any) { }

  ngOnInit(): void {
    this.getCategorys();
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      idTipoProducto: ['', Validators.required],       
    });
    if(this.editProduct){
      this.actionBtn='Actualizar';
      this.productForm.controls['nombre'].setValue(this.editProduct.nombre);
      this.productForm.controls['descripcion'].setValue(this.editProduct.descripcion);
      this.productForm.controls['precio'].setValue(this.editProduct.precio);
      this.productForm.controls['cantidad'].setValue(this.editProduct.cantidad);      
    }
  }

  getCategorys(){
    this.service.getCategorys().subscribe({
      next: (res)=>{
        this.categorys = res;
        console.log('Categorías: ');
        console.log(this.categorys);
      }, 
      error: (err) =>{
        console.log(err);
      }
    })
  }

  addProduct(){
    if(!this.editProduct){
      if(this.productForm.valid){
        this.service.addProduct(this.productForm.value).subscribe({
          next: (res)=>{
            console.log('Product added successfully');
            console.log(res);
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () =>{
            console.log('Error while adding the product')
          }
        })
      } 
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.service.editProduct(this.productForm.value, this.editProduct.id).subscribe({
      next: (res)=>{
        console.log('Product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }



}
