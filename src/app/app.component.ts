import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

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
  @Input() cl = contacts;
  @Input() activeList = this.cl.filter(c => c.active === true);
  // @Input() ;
  isChecked = false;
  @ViewChild('checkbox') checkbox: ElementRef;

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.doStuff);
  }

  sortByName() {
      const clSorted = this.cl.sort((a: { name: string }, b: { name: string }) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });
      return this.cl = clSorted;
  }

  sortBySurname() {
    const clSorted = this.cl.sort((a: { surname: string }, b: { surname: string }) => {
      const nameA = a.surname.toUpperCase();
      const nameB = b.surname.toUpperCase();

      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    });
    this.cl = clSorted;
  }

  sortByCity() {
    const clSorted = this.cl.sort((a: { city: string }, b: { city: string }) => {
      const nameA = a.city.toUpperCase();
      const nameB = b.city.toUpperCase();

      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    });
    this.cl = clSorted;
  }

  toggleActivity() {
    console.log(this.checkbox.nativeElement.checked);
    this.isChecked = !this.isChecked;
    if (this.checkbox.nativeElement.checked === true) {
      this.isChecked = true;
      return this.cl = this.activeList;
    } else {
      this.isChecked = false;
      return this.cl = contacts;
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

