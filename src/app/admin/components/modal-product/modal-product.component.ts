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
  ProductoModelo,
  ImagenModelo,
  InventarioModelo,
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
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  form!: FormGroup;
  id!: string;
  objCategories!: CategoryModelo[];
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  extPermitidas = ['jpg', 'jpeg', 'png'];
  displayedColumns: string[] = ['talla', 'inventario'];
  objProducts!: ProductoModelo[];
  objTallas: InventarioModelo[] = [];
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private matRef: MatDialogRef<ModalProductComponent>,
    private _ps: ProductosService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objProduct: ProductoModelo;
      isNew: boolean;
    },
    private swPush: SwPush,
    private _ns: NotificationsService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      description: new FormControl('', [Validators.required]),
      categorySex: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      categoryID: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.consultaInfo();
    if (!this.data.objProduct) {
      this.setDatosDefaultTalla();
    }
    if (this.data.objProduct) {
      this.id = this.data.objProduct._id.$oid;
      this.form.controls['title'].setValue(this.data.objProduct.title);
      this.form.controls['description'].setValue(
        this.data.objProduct.description
      );
      this.form.controls['categorySex'].setValue(
        this.data.objProduct.categorySex
      );
      this.form.controls['categoryID'].setValue(
        this.data.objProduct.categoryID
      );
      this.form.controls['precio'].setValue(this.data.objProduct.precio);
      this.imageName = this.data.objProduct.imageUrl;
      !this.data.objProduct.inventario
        ? this.setDatosDefaultTalla()
        : this.data.objProduct.inventario.forEach((ta) =>
            this.objTallas.push(new InventarioModelo(ta))
          );
    }
  }

  setDatosDefaultTalla() {
    this.objTallas.push({ talla: 'xs', inventario: 0 });
    this.objTallas.push({ talla: 's', inventario: 0 });
    this.objTallas.push({ talla: 'm', inventario: 0 });
    this.objTallas.push({ talla: 'l', inventario: 0 });
    this.objTallas.push({ talla: 'xl', inventario: 0 });
  }

  consultaInfo(): void {
    this._ps.getCategories().subscribe(
      (res: CategoryModelo[]) => {
        this.objCategories = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  submit() {
    this.data.isNew ? this.createProduct() : this.updateProduct();
    this.matRef.close(true);
  }

  updateProduct(): void {
    this._ps
      .updateProduct(
        this.id,
        this.form.getRawValue(),
        this.objImagen.nombreArchivo.length
          ? this.objImagen.nombreArchivo
          : this.imageName,
        this.objTallas
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Producto actualizado',
            'El producto fue actualizado correctamente'
          );
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al actualizar', 'Intente mas tarde');
        }
      );
  }

  createProduct(): void {
    this._ps
      .createProduct(
        this.form.getRawValue(),
        this.objImagen.nombreArchivo,
        this.objTallas
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Producto creado',
            'El producto fue creado correctamente'
          );
          const notification = {
            notification: {
              title: '¡Descubre lo último en nuestra tienda!',
              body: `Hemos agregado ${this.form.value.title}, ¡échale un vistazo y mantente a la moda!`,
              vibrate: [100, 50, 100],
              url: 'https://sastrerialospajaritos.proyectowebuni.com/',
              image:
                'https://sastrerialospajaritos.proyectowebuni.com/assets/resources/logo.png',
              actions: [
                {
                  action: 'explore',
                  title: 'Descubrir productos',
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
          showNotifyError('Error al crear producto', 'Intente mas tarde');
        }
      );
  }

  getTypeSex(type: string): string {
    return type === 'man' ? 'Caballero' : 'Dama';
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

  esInventarioNV(): boolean {
    let res = false;
    this.objTallas.forEach((t) => {
      if (t.inventario < 0) {
        res = true;
      }
    });
    return res;
  }
}
