import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { catchError, map, Observable, startWith ,of } from 'rxjs';
import { Product } from 'src/app/model/product.model';


@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter : EventEmitter<ActionEvent> = new  EventEmitter(); 

  constructor(private productService:ProductsService ,  private router : Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){

    this.productEventEmitter.emit({type : ProductActionsTypes.GET_ALL_PRODUCTS } );
   

  }
  onGetSelectedProducts(){
    this.productEventEmitter.emit({type : ProductActionsTypes.GET_SELECTED_PRODUCTS } );
  }
  onGetAvailableProducts(){
    this.productEventEmitter.emit({type : ProductActionsTypes.GET_AVAILABLE_PRODUCTS } );
  }

 
  onNewProduct(){
    this.productEventEmitter.emit({type : ProductActionsTypes.NEW_PRODUCT } );

  }
  onSearch(dataForm: any){
    this.productEventEmitter.emit({type : ProductActionsTypes.SEARCH_PRODUCTS, payload : dataForm } );
  }
}
