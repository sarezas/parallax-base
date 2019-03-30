import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { default as contacts } from '../assets/contacts/contacts.json';

export interface Contact {
  id: number;
  name: string;
  surname: string;
  city: string;
  email: string;
  phone: string;
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
  @Input() cl: Contact[] = contacts.slice();
  // @ViewChild('cl') ctli: ElementRef;
  @Input() al = this.cl.filter(c => c.active === true);
  isChecked = false;
  order = false;
  @ViewChild('checkbox') checkbox: ElementRef;

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.doStuff);
    console.log(this.toggleActivity);

  }

  sortByName() {
    this.order = !this.order;
    const aLSorted = this.al.sort((a: { name: string }, b: { name: string }) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      switch (this.order) {
        case x > y:
          return 1;
          break;
        case x < y:
          return -1;
          break;
    }});

    const clSorted = this.cl.sort((a: { name: string }, b: { name: string }) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      switch (this.order) {
        case x > y:
          return 1;
          break;
        case x < y:
          return -1;
          break;
    }});

    if (this.checkbox.nativeElement.checked === true) {
      this.cl = aLSorted;
    } else {
      this.cl = clSorted;
    }
    // if (this.checkbox.nativeElement.checked === true) {
    //   list.sort((a: {name: string}, b: {name: string}): any => {
        // const x = a.name.toLowerCase();
        // const y = b.name.toLowerCase();
        // switch (this.order) {
        //   case x > y:
        //     return 1;
        //     break;
        //   case x < y:
        //     return -1;
        //     break;
    //     }
    //   });
    //   return list;
    // } else {
    //   list.sort((a: {name: string}, b: {name: string}): any => {
    //     const x = a.name.toLowerCase();
    //     const y = b.name.toLowerCase();
    //     switch (this.order) {
    //       case x > y:
    //         return 1;
    //         break;
    //       case x < y:
    //         return -1;
    //         break;
    //     }
    //   });
    //   return list;
    // }
  }

  toggleActivity() {
    this.isChecked = !this.isChecked;
    if (this.checkbox.nativeElement.checked === true) {
      this.isChecked = true;
      return this.cl = this.al;
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

  // toggleActivity() {
  //   this.isChecked = !this.isChecked;
  //   if (this.checkbox.nativeElement.checked === true) {
  //     this.isChecked = true;
  //     const activeList: Contact[] = this.cl.filter(c => c.active === true);
  //     console.log(activeList);
  //     return this.cl = activeList;
  //   } else {
  //     this.isChecked = false;
  //     console.log(this.cl);
  //     return this.cl;
  //   }
  // }

  // sortBySurname() {
  //   const aLSorted = this.al.sort((a: { surname: string }, b: { surname: string }) => {
  //     const aLSurnameA = a.surname.toUpperCase();
  //     const aLSurnameB = b.surname.toUpperCase();
  //     if (aLSurnameA < aLSurnameB) { return -1; }
  //     if (aLSurnameA > aLSurnameB) { return 1; }
  //     return 0;
  //   });

  //   const clSorted = this.cl.sort((a: { surname: string }, b: { surname: string }) => {
  //     const cLSurnameA = a.surname.toUpperCase();
  //     const cLSurnameB = b.surname.toUpperCase();
  //     if (cLSurnameA < cLSurnameB) { return -1; }
  //     if (cLSurnameA > cLSurnameB) { return 1; }
  //     return 0;
  //   });

  //   if (this.checkbox.nativeElement.checked === true) {
  //     this.al = aLSorted;
  //   } else {
  //     this.cl = clSorted;
  //   }
  // }

  // sortByCity() {
  //   const aLSorted = this.al.sort((a: { city: string }, b: { city: string }) => {
  //     const aLcityA = a.city.toUpperCase();
  //     const aLCityB = b.city.toUpperCase();
  //     if (aLcityA < aLCityB) { return -1; }
  //     if (aLcityA > aLCityB) { return 1; }
  //     return 0;
  //   });

  //   const clSorted = this.cl.sort((a: { city: string }, b: { city: string }) => {
  //     const cLCityA = a.city.toUpperCase();
  //     const cLCityB = b.city.toUpperCase();
  //     if (cLCityA < cLCityB) { return -1; }
  //     if (cLCityA > cLCityB) { return 1; }
  //     return 0;
  //   });

  //   if (this.checkbox.nativeElement.checked === true) {
  //     this.al = aLSorted;
  //   } else {
  //     this.cl = clSorted;
  //   }
  // }
}

// -------------------------------------------------------------------------

