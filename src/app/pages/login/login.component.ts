import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
// import { AuthService } from '../../services/firebase/auth.service';
import { AuthService } from './services/firebase/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[AuthService]
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public errorMensaje:string=null;
  constructor(router:Router, fb:FormBuilder, private authService:AuthService,) {
      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
     console.log('mail:',String(this.form.value.email));
     console.log('password:',String(this.form.value.password));
     console.log('authService:',this.authService);
      if (this.form.valid) {
          this.authService.emailLogin(String(this.form.value.email),String(this.form.value.password))
          .subscribe(
            (user) => {
                 console.log(user)
                   this.router.navigate(['/search']);
             },
             (error) =>{

               console.log(error);

                         switch (error.code) {
                             case "auth/wrong-password":
                               this.errorMensaje="La clave es invalida o el usuario no tiene una clave";
                               break;

                             case "auth/user-not-found":
                               this.errorMensaje="No se tiene registro de este usuario.";
                               break;
                             case "auth/network-request-failed":
                               this.errorMensaje="Error de red.";
                               break;
                             case "auth/too-many-requests":
                               this.errorMensaje="Muchos intentos con datos incorrectos. Intente nuevamente mas tarde";
                               break;

                             default:
                                this.errorMensaje="error de logg sin clasificar";
                               break;
                           }
                        //   this.router.navigate(['/']);
            }

          );
        } // if
  }

  

 loginGoogle() {
    this.authService.googleLogin();

  };


 resetPassword() {

    if(String(this.form.value.email)){
    this.authService.resetPassword(String(this.form.value.email)).subscribe(
        (envioOk) => {
         console.log(envioOk);
         // this.mostrarMensajeModal("Se ha enviado un Email","Se envió un correo electronico a la casilla "+ String(this.form.value.email)+" con un link para que ingrese una nueva clave",'');
         let temp={
          email: '',
          password: '' };
      this.form.patchValue( temp);
       }
      ,(error) =>{

           console.log(error);

         switch (error.code) {
             case "auth/wrong-password":
                this.errorMensaje="La clave es invalida o el usuario no tiene una clave"
               break;

             case "auth/user-not-found":
                this.errorMensaje="No se tiene registro de este usuario."
               break;
             case "auth/network-request-failed":
                this.errorMensaje="Error de red."
               break;
             case "auth/too-many-requests":
                this.errorMensaje="Muchos intentos con datos incorrectos. Intente nuevamente mas tarde"
               break;

             default:
                 this.errorMensaje="error de logg sin clasificar"
               break;
           }
                
         let temp={
          email: '',
          password: '' };
      this.form.patchValue( temp);
// code: "auth/wrong-password"
// message: "The password is invalid or the user does not have a password."

// code: "auth/user-not-found"
// message: "There is no user record corresponding to this identifier. The user may have been deleted."

// code: "auth/network-request-failed"
// message: "A network error (such as timeout, interrupted connection or unreachable host) has occurred."

// code: "auth/too-many-requests"
// message: "Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later";
    
    });
} else {

      console.log("Mail nulo");
       // this.mostrarMensajeModal("Error! ","verifique!","El email no puede ser nulo");

    }
  };

registrarme(){
  this.router.navigate(['/registrarse']);

}


  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }




}
