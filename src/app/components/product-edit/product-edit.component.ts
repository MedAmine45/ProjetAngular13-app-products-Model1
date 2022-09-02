import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId! : number  ; 
  productFormGroup!: FormGroup ;
  submitted: boolean = false ; 
  constructor(private activatedRoute : ActivatedRoute, 
              private productService: ProductsService, 
              private fb:FormBuilder ) { 
  
  this.activatedRoute.paramMap
  .subscribe( (params: ParamMap) => {
          this.productId =Number( params.get('id'))
          //console.log(this.productId);
  });

  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(
      product =>{
        this.productFormGroup =   this.fb.group({
          id:[product.id , Validators.required],
          name:[product.name , Validators.required],
          price:[product.price, Validators.required],
          quantity:[product.quantity , Validators.required],
          selected:[product.selected, Validators.required],
          available:[product.available, Validators.required]
        })

      }
    );
  }

  OnUpdatePoduct(){
    this.productService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{ 

        alert("Success Product updated"); 
      })

  }

}
