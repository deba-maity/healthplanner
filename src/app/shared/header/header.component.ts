import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  loggedInUser: any = null;
  showLogout = false;

  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    this.loggedInUser = user ? JSON.parse(user) : null;
  }

  toggleLogout(): void {
    this.showLogout = !this.showLogout;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    location.reload(); // Or use router navigation to refresh state
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.toggle('menu-opened', this.isMenuOpen);
  }
  
  closeMenu(event: Event) {
    event.stopPropagation(); // Prevent closing if the user clicks inside the menu
  }
}