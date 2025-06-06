/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormCdkModel } from 'ngiw-common/cdk';

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

type DataModel = { idNumber: string, idType: number };
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {


  formSubmittedValue = "{}"

  formModel1: FormCdkModel<DataModel> = {} as any;
  loginForm: FormCdkModel<DataModel> = {} as any;

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
          disabled: (form: DataModel) =>  !form.idType,
          defaultValue: CONSTS.ID_NUMBER,
          customValidation: this.idNumberCustomValidation,
          errorTip: (form:DataModel) => {
            if(form.idType === 1) {
              return CONSTS.ID_NUMBER_ERROR
            }
            if (form.idType === 2) {
              return CONSTS.PASSPORT_ERROR
            } 
            return ''
          } 
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


  openForm = (tplContent: TemplateRef<any>) => {
    this.modalRef = this.nzModalService.create({
      nzStyle: { direction: 'rtl' },
      nzContent: tplContent
    });

  }

  idNumberCustomValidation = (value: any, form: DataModel) => {
    if (form.idType === 1) {
      return !this.israelIdValidator(value) ? true : false;
    }
    if (form.idType === 2) {
      return !this.passportValidator(value) ? true : false;
    }
    return false;
  }

  israelIdValidator(value: any): boolean {
    const strId = String(value).trim();

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
