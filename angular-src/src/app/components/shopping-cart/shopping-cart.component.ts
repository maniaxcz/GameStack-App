import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items:any;
  item:any;
  quantity:number=1;
  subtotal:number;
  totalitems:number;
  delivery:number=100;
  shipping:number;
  total:number;
  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.items=this.authService.getOrderFromItems();
    if(this.items==null){
      this.flashMessage.show('Please add some items to Cart', { cssClass: 'alert-danger', timeout: 2000 });
      this.subtotal=0;
      this.total=0;
      this.totalitems=0;
    }
    else{
      this.totalitems=this.items.length;
      this.subtotal=0;
      for(var i=0;i<this.totalitems;i++ )
      {
        this.item=this.items[Object.keys(this.items)[i]];
        this.subtotal+= +this.item.price;
      }
      if(this.totalitems){
        this.shipping=this.delivery;
        this.total = +(this.subtotal + this.shipping);
        }
    }
      
  }
  removeProduct(j){
    if (j > -1) {
      this.items.splice(j, 1);
    }
    this.totalitems=this.items.length;
    this.subtotal=0;
    this.total=0;
      for(var k=0;k<this.totalitems;k++)
      {
        this.item=this.items[Object.keys(this.items)[k]];
        this.subtotal += +this.item.price;
        
      } 
      if(this.totalitems){
        this.shipping=this.delivery;
        this.total = this.subtotal + this.shipping;
      }else {
        this.total =null;
        this.shipping=null;
      }
      
    this.authService.updateItemsInOrder(this.items);
    this.router.navigate(['/cart']);
  }
 
  itemslenth(){
    if(this.items.length ==null|| this.items.length == 0){
      return false; 
    }
    else
    return true;
  }
  checkout(){
    if (this.items.length == null || this.items.length == 0){
     
      this.flashMessage.show('Please add some items to Cart', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else{
      
      this.authService.storeTotal(this.total);
       this.router.navigate(['/checkout']);
    }

  }

}
