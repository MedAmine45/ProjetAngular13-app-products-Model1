import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?: FormGroup ;
  submitted: boolean = false ;
  constructor(private fb:FormBuilder ,
              private productService: ProductsService,
              private eventDrivenService : EventDriverService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],

    });
    console.log(this.productFormGroup.value)
  }
  OnSavePoduct(){
    // console.log(this.productFormGroup)
    // console.log(this.productFormGroup.get('name')?.invalid)
    this.submitted=true; 
    if(this.productFormGroup?.invalid)return;
    this.productService.save(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDrivenService.publishEvent({type: ProductActionsTypes.PRODUCT_ADDED})
        alert("Success Saving Product");
      })
  }

}
