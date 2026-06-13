import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
 
@Component({
  selector: 'app-flight-agency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-agency.component.html',
  styleUrls: ['./flight-agency.component.css']
})
export class FlightAgencyComponent implements OnInit {
  flight = {
    destination: '',
    origin: '',
    departure_date: '',
    return_date: '',
    passengers: 1
  };
 
  successMessage = '';
  errorMessage = '';
 
  constructor(private api: ApiService, private router: Router) {}
 
  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }
 
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
 
  fillTestData() {
    this.flight = {
      origin: 'Bogotá',
      destination: 'Medellín',
      departure_date: '2025-07-15',
      return_date: '2025-07-22',
      passengers: 2
    };
  }
 
  fillAndSend() {
    this.fillTestData();
    setTimeout(() => this.bookFlight(), 100);
  }
 
  bookFlight() {
    const token = localStorage.getItem('token');
    if (!token) return;
 
    this.api.saveFlight(this.flight, token).subscribe({
      next: (res) => {
        this.successMessage = '¡Reserva de vuelo guardada con éxito!';
        this.errorMessage = '';
        this.flight = { destination: '', origin: '', departure_date: '', return_date: '', passengers: 1 };
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al guardar el vuelo';
      }
    });
  }
}