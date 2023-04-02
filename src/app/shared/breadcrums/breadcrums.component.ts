import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [],
})
export class BreadcrumsComponent {
  titulo: string = '';
  tituloSubs!: Subscription;

  constructor(private router: Router) {
    this.tituloSubs = this.getDataRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }

  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
    document.title = 'AdminPro';
  }

  getDataRuta() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
