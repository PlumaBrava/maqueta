import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../maqueta/users/services/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }

}
