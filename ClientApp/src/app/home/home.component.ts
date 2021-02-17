import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public products: Product[] = [];
  public isCreating:boolean = false;
  public isEditing:boolean = false;
  public indexEdit = 0;

  productForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
  });

  productEditForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
  });

  onSubmit() {
    if(this.productForm.valid) {
      console.log(this.productForm.value)
      this.products.push({
        id: this.productForm.value.id,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        stock: this.productForm.value.stock,
        fec_save: new Date()
      });
      this.isCreating = false;
      this.productForm.reset();
    }
  }

  handleDelete(product, i) {
    this.products.splice(i, 1);
  }

  handleEdit(product, i) {
    this.productEditForm.setValue({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock
    })
    this.isEditing = true;
    this.indexEdit = i;
  }

  onSubmitEdit() {
    if(this.productEditForm.valid) {
      this.products[this.indexEdit] = {
        id: this.productEditForm.value.id,
        name: this.productEditForm.value.name,
        price: this.productEditForm.value.price,
        stock: this.productEditForm.value.stock
      };
      this.isEditing = false;
    }
  }
}

interface Product {
  id: string;
  name: number;
  price: number;
  stock: string;
  fec_save?: Date;
}
