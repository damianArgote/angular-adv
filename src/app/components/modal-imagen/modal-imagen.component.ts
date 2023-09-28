import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any;
  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) {}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: any) {
    this.imagenSubir = event.target.files[0];

    if (!this.imagenSubir) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id || '')
      .then((img) => {
        Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
