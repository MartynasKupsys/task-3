import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-list';
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName'];
  selectedUser: User | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthorizationService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.login().subscribe(result => {
        this.isAuthenticated = result;
        this.fetchUsers();
      });
    }
  }

  fetchUsers() {
    this.httpClient.get('https://demo.credoid.com/api/users', { headers: { "authorization": this.authService.getHeaderValue() } }).subscribe(result => {
      this.users = result as User[];
    })
  }

  onSelected(user: User) {
    this.selectedUser = user;

    // TODO: fetch user details
  }
}

export class User {
  firstName!: string;
  lastName!: string;
}