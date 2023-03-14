import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$ :Observable<AppDataState<Product[]>> | null = null;
  @Output() productEventEmitter : EventEmitter<ActionEvent>= new  EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }
  // onDelete(p: Product){
  //   this.productEventEmitter.emit({type : ProductActionsTypes.DELETE_PRODUCT, payload:p})

  // }
  // onSelect(p : Product){
  //   this.productEventEmitter.emit({type : ProductActionsTypes.SELECT_PRODUCT, payload:p})
    
  // }
  // onEdit(p : Product){
  //   this.productEventEmitter.emit({type : ProductActionsTypes.EDIT_PRODUCT, payload:p})

  // }

  onActionEvent($event : ActionEvent){
   this.productEventEmitter.emit($event);
  }

}
