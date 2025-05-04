import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-singup',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {

  name = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    if (!this.name || !this.email || !this.password) return;

    this.http.get<any[]>('http://dbhealth.onrender.com/users').subscribe(users => {
      const existingUser = users.find(u => u.email === this.email);
      if (existingUser) {
        alert('User already exists');
      } else {
        const newUser = { id: users.length + 1, name: this.name, email: this.email, password: this.password };
        this.http.post('http://dbhealth.onrender.com/users', newUser).subscribe(() => {
          alert('Signup successful');
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
