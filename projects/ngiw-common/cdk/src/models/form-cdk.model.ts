/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { BaseCdkModel } from "./base-cdk.model";

export const FORM_CDK_EVENTS = {
    FORM_SUBMITTED: 'formSubmitted'
};

/**
 * 
 * @param exitOnEsc - exit the form on esc
 * @param showErrorTipsOnlyOnSubmit - show error tips only on submit
 * @param submit - the submit type (button, enter)
 * @param events - the events of the form
 * @param inputs - the inputs of the form 
 */
export interface FormCdkModel<Form> extends BaseCdkModel {
    exitOnEsc: boolean;
    showErrorTipsOnlyOnSubmit: boolean;
    submit: 'button' | 'enter';
    events: {
        $formSubmitted: (event: { form: Form }) => void;
    };
    inputs: FormCdkInputModel<Form>[];
    }

/**
 * @param id - the id of the input
 * @param type - the type of the input (input, select, upload)
 * @param label - the label of the input
 * @param required - is the input required
 * @param defaultValue - the default value of the input
 * @param customValidation - a custom validation function
 * @param errorTip - the error tip of the input
 * @param $options - the options of the input (for type = select) e.g of usage: $options: this.http.get<any[]>('<your url>') or $options: from([['a', 'b', 'c']])
 * @param action - the action of the input (for type = upload) e.g of usage: action: '<your upload url>'
 * @param $defaultValue - the default value of the input e.g of usage: $defaultValue: this.http.get<any[]>('<your url>')
 */
export type FormCdkInputModel<Form> = {
    id: string;
    type: 'input' | 'select' | 'upload';
    label: string;
    required?: boolean;
    defaultValue?: any;
    customValidation?: (value: any, form: Form) => boolean;
    errorTip?: string | ((form: Form) => string);
    options?: any[];
    $options?: Observable<any[]>;
    action?: string;
    $defaultValue?: Observable<any[]>;
    disabled?: boolean | ((form: Form) => boolean);
    };


