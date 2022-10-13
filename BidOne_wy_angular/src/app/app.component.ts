import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleFormService } from './services/app.service';
import { SimpleForm } from './shared/interfaces/simple-form.model';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from './shared/modals/success/success-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  simpleForm: FormGroup;
  public bsModalRef?: BsModalRef;
  errorMessage: string = '';

  constructor(private repository: SimpleFormService, private http: HttpClient, private modal: BsModalService) { }
  ngOnInit(): void {
    this.simpleForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z ]*$')]),
    });
  }
  validateControl = (controlName: string) => {
    if (this.simpleForm!.get(controlName)!.invalid && this.simpleForm!.get(controlName)!.touched)
      return true;

    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.simpleForm!.get(controlName)!.hasError(errorName))
      return true;

    return false;
  }
  createForm = (simpleFormValue: SimpleForm) => {
    if (this.simpleForm!.valid)
      this.submitForm(simpleFormValue);
  }

  private submitForm = (simpleFormValue: SimpleForm) => {
    const simple: SimpleForm = {
      firstName: simpleFormValue.firstName,
      lastName: simpleFormValue.lastName,
    }
    const apiUrl = 'submitform';
    this.repository.submitForm(apiUrl, simpleFormValue)
      .subscribe((resp: any) => {
        this.setFormReadOnly();
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `${simpleFormValue.firstName}  ${simpleFormValue.lastName} created successfully in your desktop folder`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);

      });
  }

  setFormReadOnly() {
    this.simpleForm.disable();
  }
  title = 'BidOne_wy_angular';
}

