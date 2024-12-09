import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestOtpModel, RequestOtpResponseModel } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { TranslationService } from 'src/app/services/translation.service';
import { doctorDetails } from 'src/config/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private translationService: TranslationService) {
    this.forgotPasswordForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.translationService.getSelectedLanguage();
  }

  get f() { return this.forgotPasswordForm.controls; }

  /**
  * Request the otp for the forgot password and redirect to otp-verification screen
  * @return {void}
  */
  forgotPassword() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    let payload: RequestOtpModel = {
      otpFor: doctorDetails.PASSWORD,
      username: this.forgotPasswordForm.value.username
    };

    this.authService.requestOtp(payload).subscribe((res: RequestOtpResponseModel) => {
      if (res.success) {
        this.translationService.getTranslation(`OTP sent on your mobile number/email successfully!`, "OTP Sent",true);
        this.router.navigate(['/session/verify-otp'], { state: { verificationFor: 'forgot-password', via: 'username', val: this.forgotPasswordForm.value.username, id: res?.data?.userUuid } });
      } else {
        this.translationService.getTranslation(`${res.message}`, "Error",false);
      }
    });
  }

}
