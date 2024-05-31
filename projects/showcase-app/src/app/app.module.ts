import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { he_IL } from 'ng-zorro-antd/i18n';

import { NgiwCoreUiModule } from 'ngiw-common/core-ui';  
import { NgiwCoreUtilsModule} from 'ngiw-common/core-utils';
import { NgiwCdkModule } from 'ngiw-common/cdk';

import { FormsComponent } from './components/forms/forms.component';



@NgModule({ 
  declarations: [
    AppComponent,
    FormsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,  
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgiwCoreUiModule,
    NgiwCoreUtilsModule,
    NgiwCdkModule,
    NzSelectModule,
    NzRadioModule,
    NzButtonModule,
    NzPopoverModule,
    NzInputModule,
    NzFormModule,
    NzBackTopModule,
    NzIconModule,
    NzToolTipModule,
    NzUploadModule,
    NzImageModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzModalModule,
    NzCascaderModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: he_IL } 
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }