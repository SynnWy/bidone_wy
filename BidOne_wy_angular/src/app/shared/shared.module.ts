import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { ErrorModalComponent } from './modals/error/error-modal.component';
import { SuccessModalComponent } from './modals/success/success-modal.component';

@NgModule({
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
  ],
  providers: [BsModalService]
})
export class SharedModule { }
