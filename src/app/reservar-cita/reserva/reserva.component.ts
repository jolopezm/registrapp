import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent  implements OnInit {
  isModalOpen = false;

  ngOnInit(): void {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
