/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FORM_CDK_EVENTS, FormCdkInputModel, FormCdkModel } from '../../models/form-cdk.model';
import { BaseCdkComponent } from '../base-cdk/base-cdk.component';

@Component({
  selector: 'ngiw-form-cdk',
  templateUrl: './form-cdk.component.html',
  styleUrls: ['./form-cdk.component.css'],
})
export class FormCdkComponent<Form> extends BaseCdkComponent implements AfterViewInit {
  override model = input<FormCdkModel<Form>>({} as FormCdkModel<Form>);
  files: { [controlId: string]: any } = {};
  currentFormValues = {};
  readyOnce = false;
  form: any;
  sources: any = {};

  constructor(private fb: FormBuilder) {
    super();
  }

  ngAfterViewInit() {
    console.log('FormCdkComponent initialized');
    console.log('FormCdkComponent model:', this.model());
    this.initForm();
    this.setSources();
  }

  initForm = () => {
    const ngFormControls: any = {};
    const customValidators: any = {};

    if (!this.model() || !this.model().inputs) {
      return;
    }

    this.model().inputs.forEach((input: FormCdkInputModel<Form>) => {
      const ngFormControl = [input.defaultValue ?? ''];

      ngFormControl.push(this.getValidators(input));

      if (
        input.customValidation &&
        typeof input.customValidation === 'function'
      ) {
        customValidators[input.id] = (
          control: AbstractControl,
        ): ValidatorFn => {
          return (input as any).customValidation(control.value, this.form.value) ? { error: true } as any : null
        };
      }

      if (input.type === 'upload') {
        this.files[input.id] = input.defaultValue || [];
      }

      if (input.$defaultValue) {
        input.$defaultValue.subscribe((res: any) => {
          this.form.controls[input.id].setValue(res);
          if (input.type === 'upload') {
            this.files[input.id] = res;
          }
        });
      }

      ngFormControls[input.id] = ngFormControl;
    });

    this.form = this.fb.group(ngFormControls);

    this.model().inputs.forEach((input: FormCdkInputModel<Form>) => {
      const control = this.form.get(input.id) as AbstractControl;
      this.EnableOrDisable(input, control);
    });

    Object.keys(customValidators).forEach((key) => {
      const control = this.form.get(key) as AbstractControl;
      control.addValidators(customValidators[key]);
    });

    this.form.valueChanges.subscribe((changedValue: any) => {
      const currentValuesStr = JSON.stringify(changedValue);
      const previousValuesStr = JSON.stringify(this.currentFormValues);
      this.currentFormValues = JSON.parse(currentValuesStr);
      if (currentValuesStr !== previousValuesStr) {
        Object.keys(customValidators).forEach((key) => {
          const control = this.form.get(key) as AbstractControl;
          this.EnableOrDisable(this.model().inputs.find((input) => input.id === key), control);
          control.updateValueAndValidity();
        });
      }
    });
  };

  /* setDefaultValues = () => {

  }*/

  EnableOrDisable = (input:any, control:AbstractControl) => {
    let isEnabled = true;
    if (typeof input.disabled === 'function') {
      isEnabled = !input.disabled(this.form.value);
    }
    else {
      isEnabled =  !input.disabled;
    } 
    if (isEnabled && control.disabled) {
      control.enable();
    }
    if (!isEnabled && control.enabled) {
      control.disable();
    }
  }

  setSources = () => {
    this.model().inputs?.forEach((input: any) => {
      if (input.options) {
        this.sources[input.id] = input.options;
      }
      if (input.$options) {
        input.$options?.subscribe((options: any) => {
          this.sources[input.id] = options;
        });
      }
    });
  };

  getValidators = (input: any) => {
    const validators = [];
    if (input.required) {
      validators.push(Validators.required);
    }

    if (input.validators) {
      validators.push(...input.validators);
    }

    return validators;
  };

  submitForm = () => {
    if (this.form.valid) {
      this.fireEvent(FORM_CDK_EVENTS.FORM_SUBMITTED, { form: this.form.value });
    }
  };

  getErrorTip = (input: any) => {
    const errorTip = input.errorTip;
    if (typeof errorTip === 'string') {
      return errorTip;
    }
    if (typeof errorTip === 'function') {
      return errorTip(this.form?.value);
    }
    return '';
  };
}
