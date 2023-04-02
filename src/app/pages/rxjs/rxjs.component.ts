import { Component } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent {
  intervalSubs!: Subscription;

  constructor() {
    /* this.retornaObservable()
      .pipe(retry(2))
      .subscribe(
        (valor) => {
          console.log('Subs:', valor);
        },
        (error) => console.warn('error', error),
        () => console.info('obs$ terminado')
      ); */

    this.intervalSubs = this.retornaIntervalo().subscribe((valor) => {
      console.log(valor);
    });
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      //take(10),
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
  }
}
