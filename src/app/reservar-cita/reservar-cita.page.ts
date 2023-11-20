import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.page.html',
  styleUrls: ['./reservar-cita.page.scss'],
})
export class ReservarCitaPage implements OnInit {
  fecha?: string;
  especialidad?: string;
  medico?: string;
  sede?: string;
  constructor() { }

  ngOnInit() {
    
  }
}
