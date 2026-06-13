import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Registrar usuario
  register(data: any) {
    return this.http.post<any>(`${this.base}/auth/register`, data);
  }

  // Login
  login(data: any) {
    return this.http.post<any>(`${this.base}/auth/login`, data);
  }

  // Verificar 2FA
  verify2fa(data: any) {
    return this.http.post<any>(`${this.base}/auth/verify-2fa`, data);
  }

  // Guardar vuelo directo al Mock de Postman
  saveFlight(flight: any) {
    const payload = {
      origen: flight.origin,
      destino: flight.destination,
      fechaida: flight.departure_date,
      fecharegreso: flight.return_date,
      numpasajetos: flight.passengers
    };
    return this.http.post(`https://2e38a413-ee2e-4570-93b0-24dbd7316aed.mock.pstmn.io/Agencia/Guardar%20Vuelos`, payload);
  }

  // Obtener todos los vuelos directo del Mock de Postman
  getFlights() {
    return this.http.get<any[]>(`https://2e38a413-ee2e-4570-93b0-24dbd7316aed.mock.pstmn.io/Agencia/Reservas`);
  }
}