import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public uid?: string
  ) {}

  get imageUrl() {
    if (this.img) {
      if (this.img.includes('https')) {
        return this.img;
      }
      return `${baseUrl}/upload/usuarios/${this.img}`;
    } else {
      return `${baseUrl}/upload/usuarios/no-image`;
    }
  }
}
