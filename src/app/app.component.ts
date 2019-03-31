import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { default as contacts } from '../assets/contacts/contacts.json';
import { Contact } from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'parallax';
  pageYOffset = window.scrollY;
  @Input() cl: Contact[] = contacts;
  // @ViewChild('cl') ctli: ElementRef;
  @Input() al: Contact[] = this.cl.filter(c => c.active === true);
  // @Input() al: Contact[];


  isChecked = false;
  order = false;
  @ViewChild('checkbox') checkbox: ElementRef;
  @Input() cities: any = this.cl.filter(c => c.city);

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.doStuff);
    console.log(Object.values(this.cities));
  }

  sortByName() {
    this.order = !this.order;
    console.log(this.order);
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
      }
    });

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
      }
    });

    if (this.checkbox.nativeElement.checked === true) {
      console.log(this.cl);
      return this.cl = aLSorted;
    } else {
      console.log(this.cl);
      return this.cl = clSorted;
    }
  }

  toggleActivity() {
    this.isChecked = !this.isChecked;
    if (this.checkbox.nativeElement.checked === true) {
      // this.isChecked = true;
      return this.cl = this.al;
    } else {
      // this.isChecked = false;
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

