import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, startWith ,of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ :Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService: ProductsService,private router : Router) { }

  ngOnInit(): void {
  }
  
  onGetAllProducts(){
    this.products$ =
       this.productService.getAllProducts().pipe(
        map(data=>{
          console.log(data)
          return ({dataState:DataStateEnum.LOADED,data:data})}) , 
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR , errorMessage: err.message}))
       );

  }


  onGetSelectedProducts(){
    this.products$ = this.productService.getSeletedProducts().pipe(
      map(data=>{
        console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data})}) , 
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.LOADED , errorMessage: err.message}))
     );
  }
  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data})}) , 
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.LOADED , errorMessage: err.message}))
     );
  }

  onSearch(dataForm: any){
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data})}) , 
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.LOADED , errorMessage: err.message}))
     );
  }
  onSelect(p : Product){
    this.productService.select(p)
    .subscribe(data=>{
      p.selected = data.selected;
    })
  }
  onDelete(p: Product){
    let v = confirm("Etes vous sure ?");
    if(v==true)
    this.productService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts()
      })
  }
  onNewProduct(){
    this.router.navigateByUrl("/newProduct")

  }

  onEdit(p : Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event : ActionEvent){
   switch($event.type){
    case ProductActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProducts(); break;
    case ProductActionsTypes.GET_SELECTED_PRODUCTS : this.onGetSelectedProducts(); break;
    case ProductActionsTypes.GET_AVAILABLE_PRODUCTS : this.onGetAvailableProducts(); break;
    case ProductActionsTypes.SEARCH_PRODUCTS : this.onSearch($event.payload); break;
    case ProductActionsTypes.NEW_PRODUCT : this.onNewProduct(); break;
    case ProductActionsTypes.SELECT_PRODUCT : this.onSelect($event.payload); break;
    case ProductActionsTypes.DELETE_PRODUCT : this.onDelete($event.payload); break;
    case ProductActionsTypes.EDIT_PRODUCT : this.onEdit($event.payload); break;
   }
  }
}
