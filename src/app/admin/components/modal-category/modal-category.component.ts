import {
  Component,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwPush } from '@angular/service-worker';
import {
  CategoryModelo,
  ImagenModelo,
} from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import {
  showNotifyError,
  showNotifySuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  form!: FormGroup;
  id!: string;
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  extPermitidas = ['jpg', 'jpeg', 'png'];
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private matRef: MatDialogRef<ModalCategoryComponent>,
    private _ps: ProductosService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objCategory: CategoryModelo;
      isNew: boolean;
    },
    private swPush: SwPush,
    private _ns: NotificationsService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      description: new FormControl('', [Validators.required]),
      categorySex: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.data.objCategory) {
      this.id = this.data.objCategory._id.$oid;
      this.form.controls['name'].setValue(this.data.objCategory.name);
      this.form.controls['description'].setValue(
        this.data.objCategory.description
      );
      this.form.controls['categorySex'].setValue(
        this.data.objCategory.categorySex
      );
      this.imageName = this.data.objCategory.imageUrl;
    }
  }

  submit() {
    this.data.isNew ? this.createCategory() : this.updateCategory();
    this.matRef.close(true);
  }

  updateCategory(): void {
    this._ps
      .updateCategory(
        this.id,
        this.form.getRawValue(),
        this.objImagen.nombreArchivo.length
          ? this.objImagen.nombreArchivo
          : this.imageName
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Categoría actualizada',
            'La categoría fue actualizada correctamente'
          );
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al actualizar', 'Intente mas tarde');
        }
      );
  }

  createCategory(): void {
    this._ps
      .createCategory(this.form.getRawValue(), this.objImagen.nombreArchivo)
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Categoría creada',
            'La categoría fue creada correctamente'
          );
          const notification = {
            notification: {
              title: 'Explora nuestras novedades de categorías',
              body: `¡Hemos ampliado nuestra selección! Descubre la nueva categoría de ${this.form.value.name} y encuentra productos increíbles.`,
              vibrate: [100, 50, 100],
              url: 'https://sastrerialospajaritos.proyectowebuni.com/',
              image:
                'https://sastrerialospajaritos.proyectowebuni.com/assets/resources/logo.png',
              actions: [
                {
                  action: 'explore',
                  title: 'Ver categorías',
                },
              ],
            },
          };
          this.swPush.subscription.subscribe((sub) => {
            this._ns.pushNotificationMasiva(notification).subscribe();
          });
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al crear categoría', 'Intente mas tarde');
        }
      );
  }

  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }

  seleccionarImagen(event: any) {
    const files = event.target.files;
    const file = files[0];
    const ext = this.getFileExtension(file.name);
    if (ext && !this.extPermitidas.includes(ext)) {
      showSwalWarning(
        'Formato de archivo no valido',
        'Solo se admiten archivos .jpg, .jpeg, .png'
      );
      this.inputFile.nativeElement.value = '';
      return;
    }

    this.objImagen.nombreArchivo = file.name;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.objImagen.base64textString = btoa(binaryString);
  }

  uploadImage() {
    console.log(this.objImagen);
    this._ps.uploadFile(this.objImagen).subscribe(
      (datos) => {},
      (e) => {
        showNotifyError('Error al subir imagen', 'Intente mas tarde');
      }
    );
  }
}
