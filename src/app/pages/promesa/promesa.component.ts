import { Component } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [],
})
export class PromesaComponent {
  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('hola mundo');
      } else {
        reject('error');
      }
    });

    promesa
      .then((mensaje) => {
        console.log('ey termine', mensaje);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('fin onInit');
    this.getUsuarios().then((usuarios) => console.log(usuarios));
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });

    return promesa;
  }
}
