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

  // Lista de vuelos cargados desde la BD
  flights: any[] = [];
  flightsLoaded = false;

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

  bookFlight() {
    this.api.saveFlight(this.flight).subscribe({
      next: (res) => {
        this.successMessage = '¡Reserva de vuelo guardada con éxito!';
        this.errorMessage = '';
        this.flight = { destination: '', origin: '', departure_date: '', return_date: '', passengers: 1 };
        // Recargar la lista si ya estaba visible
        if (this.flightsLoaded) this.loadFlights();
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Error al guardar el vuelo';
      }
    });
  }

  loadFlights() {
    this.api.getFlights().subscribe({
      next: (data: any[]) => {
        this.flights = data;
        this.flightsLoaded = true;
        this.errorMessage = '';
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Error al cargar los vuelos';
      }
    });
  }
}
