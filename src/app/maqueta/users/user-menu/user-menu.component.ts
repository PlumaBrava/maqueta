import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../maqueta/users/services/auth.service';
@Component({
  selector: 'users-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  constructor( public authService:AuthService,) { }

  ngOnInit() {
  }

}
