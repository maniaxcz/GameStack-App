import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items:any;
  totalitems:number;
  iscollapsed = true;
  constructor(private authSerivce: AuthService, private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {

  }
  
  onItemsInCart() {
    this.items=this.authSerivce.getOrderFromItems();
    if(this.items==null){
      this.totalitems=0;
    }
    else{
      this.totalitems=this.items.length;
    }
    if(this.totalitems>0){
      return true;
    }
  }

  onLogoutClick() {

    this.authSerivce.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
