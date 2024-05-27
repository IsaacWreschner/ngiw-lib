import { Component, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormCdkComponent } from 'ngiw-common/cdk';
import { FormCdkModel } from 'projects/ngiw-common/cdk/src/models/form-cdk.model';
import { Observable } from 'rxjs';

const CONSTS = {
  ID_TYPES: [
    { id: 1, label: 'תעודת זהות' },
    { id: 2, label: 'דרכון' }
  ],
  ID_TYPE: 1,
  ID_NUMBER: '123456789',
  ID_NUMBER_ERROR: 'מספר תעודת זהות לא תקין',
  ID_NUMBER_LABEL: 'מספר תעודת זהות',
  ID_TYPE_LABEL: 'סוג תעודת זהות',
  PASSPORT: '123456',
  PASSPORT_LABEL: 'מספר דרכון',
  PASSPORT_ERROR: 'מספר דרכון לא תקין'
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {


  formSubmittedValue = "{}"

  formModel1: FormCdkModel<{ idNumber: string, idType: number }> = {} as any;
  loginForm: FormCdkModel<{ idNumber: string, idType: number }> = {} as any;

  modalRef: any;

  constructor(private nzModalService: NzModalService) {
    this.formModel1 = {
      exitOnEsc: false,
      showErrorTipsOnlyOnSubmit: false,
      submit: 'button',
      events: {
        $formSubmitted: (event) => {
          this.formSubmittedValue = JSON.stringify(event.form);
          if (this.modalRef) {
            this.modalRef.close();
          }
        }
      },
      inputs: [
        {
          id: 'idNumber',
          type: 'input',
          label: CONSTS.ID_NUMBER_LABEL,
          required: true,
          defaultValue: CONSTS.ID_NUMBER,
          customValidation: this.idNumberCustomValidation,
          errorTip: CONSTS.ID_NUMBER_ERROR
        },
        {
          id: 'idType',
          type: 'select',
          defaultValue: 1,
          options: CONSTS.ID_TYPES,
          label: CONSTS.ID_TYPE_LABEL,
          required: true,
        }
      ]
    };
  }

  ngOnInit() {

  }

  openForm = (tplContent: TemplateRef<{}>) => {
    this.modalRef = this.nzModalService.create({
      nzStyle: { direction: 'rtl' },
      nzContent: tplContent
    });

  }

  idNumberCustomValidation = (control: AbstractControl, form: any) => {
    if (form.idType === 1) {
      return !this.israelIdValidator(control.value) ? { error: true } : null;
    }
    if (form.idType === 2) {
      return !this.passportValidator(control.value) ? { error: true } : null;
    }
    return null;
  }

  israelIdValidator(value: any): boolean {
    let strId = String(value).trim();

    if (strId.length !== 9) {
      return false;
    }

    let counter = 0, rawVal, actualVal;
    for (let i = 0; i < strId.length; i++) {
      rawVal = Number(strId[i]) * ((i % 2) + 1);
      actualVal = rawVal > 9 ? (rawVal - 9) : rawVal;
      counter += actualVal;
    }

    return counter % 10 === 0;
  }

  passportValidator(value: any): boolean {
    const regex = /^(?!^0+$)[a-zA-Z0-9]{6,9}$/;
    return regex.test(value);
  }
}
