import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QrCodeService } from '../servicios/qr-code.service';
import { ActionSheetController, NavController, ModalController, ToastController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service'; // Importar el servicio
import { MarcaAsistenciaService } from '../servicios/marcasistencia.service'; 

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

  constructor (
    private actionSheetController: ActionSheetController, 
    private navCtrl: NavController,
    private modalController: ModalController,
    private toastController: ToastController,
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

  generateMyQRCode() {
    const myData = 'https://www.duoc.cl/alumnos/';
    this.qrCodeService.generateQRCode(myData).subscribe(response => {
        this.qrCodeURL = URL.createObjectURL(response);
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
          role: 'danger', // Apply the red danger theme
          icon: 'exit', // Optional: You can add an icon
          handler: () => {
            console.log('Cerrando sesión'); // Optional: You can perform actions here
            // Navigate to another page here
            this.navCtrl.navigateForward('/home'); // Replace '/another-page' with the actual path to the page you want to navigate to
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
  
        // Retrieve existing asistencias
        const asistencias: Asistencia[] = await this.marcaAsistenciaService.obtenerAsistencias();
  
        // Check if the user is already in the list
        if (!this.isAlreadyInList(nombreUsuario, asistencias)) {
          // If not in the list, mark attendance and close the modal
          this.marcaAsistenciaService.marcarAsistencia(nombreUsuario);
          this.closeModal();
        } else {
          // User is already in the list, display a message or take appropriate action
          console.log('Ya has marcado tu asistencia.');
          // You can also display a toast or any other notification to inform the user.
        }
      }
    }
  }
  
  private isAlreadyInList(username: string, asistencias: Asistencia[]): boolean {
    return asistencias.some(asistencia => asistencia.alumno === username);
  }
  
}

interface Asistencia {
  alumno: string;
  docente: string;
  asignatura: string;
  fecha: string;
}