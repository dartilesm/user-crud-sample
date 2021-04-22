import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['idUser', 'name', 'surname', 'age', 'action'];
  dataSource: User[] = [];
  isOnEditMode: {
    [key: string]: boolean
  } = {};

  isOnCreateMode: {
    [key: string]: boolean
  } = {};
  userModel: User = {} as User;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  private getAllUsers() {
    this.usersService.findAll()
    .then(data => this.dataSource = data)
  }

  createUser(confirm?: boolean, index?: number) {
    if (confirm) {
      this.usersService.create(this.userModel)
        .then(() => this.isOnCreateMode[`user`+index] = false)
    } else {
      this.userModel = {
        idUser: this.dataSource.length + 1
      } as User;
      this.isOnCreateMode[`user${this.dataSource.length}`] = true
      this.dataSource = [...this.dataSource, this.userModel]
    }

  }

  editUser(user: User, index: number) {
    this.userModel = user
    Object.keys(this.isOnCreateMode).forEach(key => {
      if (this.isOnCreateMode[key]) {
        this.dataSource.pop()
        this.dataSource = [...this.dataSource]
      }
      this.isOnCreateMode[key] = false
    })
    if (this.isOnEditMode[`user${index}`]) {
      this.usersService.update(this.userModel.idUser, this.userModel)
        .then(() => {
          this.isOnEditMode[`user${index}`] = false
          this.userModel = {} as User;
        })
    } else {
      this.isOnEditMode[`user${index}`] = true
    }
  }

  deleteUser(user: User) {
    this.usersService.remove(user.idUser)
      .then(() => this.getAllUsers())
  }

}
