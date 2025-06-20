import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CaptchaService } from '../../services/captcha.service';
import { CryptoService } from '../../services/crypto.service';
import { ToastService } from '../../services/toast.service';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SalesService } from '../../services/sales.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss',
})
export class CustomerLoginComponent implements OnInit, OnDestroy {
  message = '';
  invalidLogin = false;
  form!: FormGroup;
  submitted = false;
  error!: string | null;
  hide = true;
  role: any;
  loginDisable: boolean = false;
  captcha!: string;
  userInput!: string;
  captchaStyle: any;
  decryptedResponse: any;
  isEO: any;
  username: any;
  isPL_SL_WS: any;
  isAD: any;
  directorate: any;
  sllogin: any;
  phlogin: any;
  wslogin: any;
  zone: any;
  userName: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private titleService: Title,
    private toastService: ToastService,
    private captchaService: CaptchaService,
    private cryptoService: CryptoService,
    private toast: ToastService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,

    private salesService: SalesService
  ) {
    this.titleService.setTitle('Hotel');
  }

  ngOnInit(): void {
    sessionStorage.setItem('userType', 'Customer');
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_.-]*$/), // Alphanumeric characters, underscores, dots, or dashes
          Validators.maxLength(40), // Maximum length of 20 characters
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(2), // Minimum length of 2 characters
          Validators.maxLength(16), // Maximum length of 16 characters
        ],
      ],
      captchaInput: ['', Validators.required],
    });
    this.generateCaptcha();
    document.addEventListener('paste', this.preventPaste);
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnDestroy() {
    document.removeEventListener('paste', this.preventPaste);
  }

  preventPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  preventDrop(event: DragEvent) {
    event.preventDefault();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default right-click behavior
  }

  inputValidate(evt: any, field: any) {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regexValue = /[0-9.]/;
    if (field == 'alphabets') {
      regexValue = /^[a-zA-Z]+$/;
    } else if (field == 'alphaNumeric') {
      regexValue = /[0-9 a-zA-Z]/;
    } else if (field == 'numbersonly') {
      regexValue = /[.0-9 ]/;
    } else if (field == 'alphaNumericWithUnderscore') {
      regexValue = /^[a-zA-Z0-9_]+$/;
    } else if (field === 'email') {
      // Email regex pattern
      regexValue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }

    const regex = regexValue;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }

    // Prevent pasting using Ctrl+V within the keypress event
    if (theEvent.ctrlKey && (theEvent.key === 'v' || theEvent.key === 'V')) {
      theEvent.preventDefault();
    }
  }

  generateCaptcha(): void {
    const captchaData = this.captchaService.generateCaptchaWithStyle(6);
    this.captcha = captchaData.text;
    this.captchaStyle = captchaData.style;
  }

  preventRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

  // checkLogin() {
  //   this.router.navigate(['/Hotel/invoice']);

  // }
  //   login() {

  //       let User_Details = {
  //         username: this.form.value.username,
  //         password: this.form.value.password,
  //       };

  //       this.salesService
  //         .apiPostCall(User_Details, '/api/auth/signIn')
  //         .subscribe(
  //           (res: any) => {
  //             console.log("responseeeee",res)
  //             if (res.responseObject && res.responseObject.jwtCustomResponse) {

  //               console.log("townpanchayat",res.responseObject.jwtCustomResponse.townpanchayat)
  //               // Store session data
  //               sessionStorage.setItem('username', res.responseObject.jwtCustomResponse.username);
  //               sessionStorage.setItem('zone', res.responseObject.jwtCustomResponse.zone);
  //               sessionStorage.setItem('token', res.responseObject.jwtCustomResponse.token);
  //               sessionStorage.setItem('townpanchayat', res.responseObject.jwtCustomResponse.townpanchayat);
  //               sessionStorage.setItem('Directorate', res.responseObject.jwtCustomResponse.directorate);
  //               this.username = sessionStorage.getItem('townpanchayat');
  // this.userName=sessionStorage.getItem('username');
  // console.log("usernameeeeee",this.userName)
  //               this.isEO = this.username.startsWith('EO');

  //               // Check if townpanchayat starts with "PL", "SL", or "WS"
  //               this.isPL_SL_WS = /^(PH|SL|WS)/.test(this.username);
  //               if(this.isPL_SL_WS){
  //                 this.router.navigate(['/Hotel/invoice_edit'])

  //               }else {
  //                this.router.navigate(['/Hotel/invoice']);

  //               }

  //               this.openSnackBar('Login successfully', 'Close');

  //             } else {
  //               this.openSnackBar('Bad Credentials', 'Close');
  //             }
  //           },
  //           (error) => {
  //             // Handle HTTP errors (like 401 Unauthorized)
  //             this.openSnackBar('Bad Credentials', 'Close');
  //             console.error('Login error', error);
  //           }
  //         );

  //   }

  login() {
    let User_Details = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.salesService.apiPostCall(User_Details, '/api/auth/signIn').subscribe(
      (response: any) => {
        console.log('Response:', response);

        if (response.responseStatus && response.responseStatusCode) {
          const jwtCustomResponse = response.responseObject?.jwtCustomResponse;

          if (
            jwtCustomResponse &&
            jwtCustomResponse.message === 'Invalid username or password'
          ) {
            // Show MatSnackBar for invalid credentials
            this.openSnackBar('Invalid Username or Password', 'Close');
            return;
          }

          if (jwtCustomResponse) {
            console.log('townpanchayat', jwtCustomResponse.townpanchayat);

            // Store session data
            sessionStorage.setItem('username', jwtCustomResponse.username);
            sessionStorage.setItem('zone', jwtCustomResponse.zone);
            sessionStorage.setItem('token', jwtCustomResponse.token);
            sessionStorage.setItem(
              'townpanchayat',
              jwtCustomResponse.townpanchayat
            );
            sessionStorage.setItem(
              'division',
              jwtCustomResponse.division || ''
            );
            sessionStorage.setItem(
              'directorate',
              jwtCustomResponse.directorate || ''
            );

            this.username = sessionStorage.getItem('townpanchayat');
            this.userName = sessionStorage.getItem('username');

            this.isEO = this.userName?.startsWith('EO');

            // Check if townpanchayat starts with "PH", "SL", or "WS"
            this.isPL_SL_WS = /^(PH|SL|WS)/.test(this.username || '');

            // Redirect user based on their role
            //  this.isPL_SL_WS = /^(PH|SL|WS)/.test(this.username);
            if (this.isPL_SL_WS) {
              this.router.navigate(['/Hotel/invoice_edit']);
            } else {
              this.router.navigate(['/Hotel/invoice']);
            }

            this.openSnackBar('Login Successful', 'Close');
          } else {
            // Handle invalid credentials
            this.openSnackBar('Invalid Credentials', 'Close');
          }
        } else {
          // Generic login failure
          this.openSnackBar('Login Failed. Please try again.', 'Close');
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.openSnackBar('Error occurred during login', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // duration in milliseconds
      panelClass: ['large-snackbar'], // Apply custom class
    });
  }

  check() {
    window.open('https://www.google.com/', '_self');
  }

  logout(customerId: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Logout',
        message: `Are you sure you want to Logout the previous Login?`,
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        sessionStorage.clear();
        this.authService.customerLogout(customerId).subscribe((res: any) => {
          if (res.message) {
            sessionStorage.clear();
            this.router.navigate(['']);
            this.toast.showToast(
              'warning',
              'Logout Successfully.Now you can able to login',
              ''
            );
          }
        });
      }
    });
  }

  parseDateEnd(dateString: string): Date {
    const dateParts = dateString?.split(/,?\s+/);
    const [day, month, year] = dateParts[0]?.split('/')?.map(Number);
    const [time, period] = dateParts[1]?.split(' ');
    let [hours, minutes, seconds] = time?.split(':').map(Number);

    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  parseDateStart(dateString: string): Date {
    const dateParts = dateString?.split(/,?\s+/);
    const [day, month, year] = dateParts[0]?.split('/')?.map(Number);
    const [time, period] = dateParts[1]?.split(' ');
    let [hours, minutes, seconds] = time?.split(':').map(Number);

    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  goToForgotPassword() {
    this.router.navigate(['customer-forgot-password']);
  }
}
