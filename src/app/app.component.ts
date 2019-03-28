import { Component, OnInit, Input } from '@angular/core';

import { default as contacts } from '../assets/contacts/contacts.json';

export interface Contact {
  id: number;
  name: string;
  surname: string;
  city: string;
  email: string;
  phome: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'parallax';
  pageYOffset = window.scrollY;
  // @Input() contactsList = JSON.stringify(contacts);
  @Input() contactsList = contacts;


  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.doStuff);
    // console.log(contacts[0]);
    // const arr: Contact[] = this.contactsList;
    for (let i = 0; i <= contacts.length; i++) {
      console.log(contacts[i].id);
    }
  }

  doStuff() {
    // console.log(`scrolled ${this.pageYOffset} px from top`);
    const layers = document.querySelectorAll('[data-type="parallax"]');

    for (const layer of layers as any) {
      const depth = layer.getAttribute('data-depth');
      // console.log(depth);
      const movement = -this.pageYOffset * depth;
      // console.log(movement);
      const translate3d = 'translate3d(0, ' + movement + 'px, 0)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
    }
  }
}

// -------------------------------------------------------------------------

