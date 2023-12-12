import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { QrCodeService } from '../servicios/qr-code.service';
import { ActionSheetController, NavController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service'; // Importar el servicio
import { MarcaAsistenciaService } from '../servicios/marcasistencia.service'; 
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  asistencias: Asistencia[] = [];
  showModal: boolean = false;
  qrCodeURL: string | null = null;
  showQRSection: boolean = false;
  isSupported = true;
  barcodes: Barcode[] = [];  
  asistenciaConfirmada: boolean = false;

  constructor (
    private actionSheetController: ActionSheetController, 
    private navCtrl: NavController,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router, 
    private activatedRouter: ActivatedRoute, 
    private qrCodeService: QrCodeService, 
    private auth: AutenticacionService,
    private marcaAsistenciaService: MarcaAsistenciaService
  ) { }

  public alertButtons = ['OK'];

  public user = {
    usuario: "",
    password: "",
    rol: ""
  }

  asignatura = this.marcaAsistenciaService.asignatura;
  docente = this.marcaAsistenciaService.docente;
  fecha = this.marcaAsistenciaService.fecha;

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        this.user.rol = state['user'].rol;
        console.log(this.user);
      }
    })

    if (this.isSupported) {
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
      console.log("El scanner es compatible con este dispositivo.")
    } else {
      console.log("El scanner no es compatible con este dispositivo.")
    }
  }

  showQRSectionFunc() {
    this.generateMyQRCode();
    this.showQRSection = true;
  }

  openModal() {
    this.generateMyQRCode();
    this.showModal = true;
  }


  closeModal() {
    this.modalController.dismiss();
  }

  resetModal() {
    this.showModal = false;
    this.showQRSection = false;
    this.qrCodeURL = null;
  }

  myData = 'https://www.duoc.cl/alumnos/';

  generateMyQRCode() {
    this.qrCodeService.generateQRCode(this.myData).subscribe(response => {
        this.qrCodeURL = URL.createObjectURL(response);
        this.myData = this.qrCodeURL;
    });
  }

  async cargarAsistencias() {
    try {
      this.asistencias = await this.marcaAsistenciaService.obtenerAsistencias();
    } catch (error) {
      console.error('Error al cargar las asistencias', error);
      // Puedes agregar lógica adicional aquí, como mostrar un mensaje de error en la interfaz de usuario.
    }
  }

  modalDismissed() {
    this.showModal = false;
    this.showQRSection = false;
    this.qrCodeURL = null;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [
        {
          text: 'Cerrar sesión',
          role: 'danger', 
          icon: 'exit', 
          handler: () => {
            console.log('Cerrando sesión');
            this.auth.logout();
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cerrando');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async confirmarAsistencia() {
    if (this.auth.autenticado) {
      const usuarioAutenticado = this.auth.getAuthenticatedUser();
      if (usuarioAutenticado) {
        const nombreUsuario = usuarioAutenticado.username;
  
        try {
          const asistencias: Asistencia[] = await this.marcaAsistenciaService.obtenerAsistencias();
          if (!this.guardadoEnLista(nombreUsuario, asistencias)) {
            this.marcaAsistenciaService.marcarAsistencia(nombreUsuario);
            this.closeModal();
            this.presentToast('Asistencia guardada.', 'green-toast');
  
          } else {
            this.asistenciaConfirmada = true;
            this.presentToast('Ya has confirmado tu asistencia.', 'red-toast');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }

  async presentToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      cssClass
    });
  
    toast.present();
  }
  
  private guardadoEnLista(username: string, asistencias: Asistencia[]): boolean {
    return asistencias.some(asistencia => asistencia.alumno === username);
  }

  async scan(): Promise<void> {
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
      let navigationExtras: NavigationExtras = {};
      this.openAsistenciaModal();
    }
    catch (error) {
      this.presentToast('Dispositivo incompatible con el scanner QR.', 'red-toast')
      console.error('Error: ', error)
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor otorgue los permisos para ejecutar el scanner.',
      buttons: ['OK'],
    });
    await alert.present();
    
  }

  async openAsistenciaModal() {
    const modal = await this.modalController.create({
      component: 'modal', // Usa 'modal' como nombre del componente, que tiene la directiva #modal
      componentProps: {
        // Puedes pasar parámetros al modal si es necesario
      },
      id: 'open-modal1' // Identifica el modal que quieres abrir por el trigger
    });
  
    await modal.present();
  }
}

interface Asistencia {
  alumno: string;
  docente: string;
  asignatura: string;
  fecha: string;
}

