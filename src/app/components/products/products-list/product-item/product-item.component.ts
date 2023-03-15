import { Component, OnInit , Input, Output , EventEmitter} from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product | null = null ;
  //@Output() eventEmitter : EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>()
  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {

  }
  onSelect(product : Product){
   // this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT, payload: product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT, payload: product });

  }
  onEdit(product : Product){
    //this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT, payload: product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT, payload: product});
  }
  onDelete(product :Product){
    //this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT, payload: product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT, payload: product});

  }

}
