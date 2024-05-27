import { NgModule } from '@angular/core';
import { FormCdkComponent } from './components/form-cdk/form-cdk.component';
import { BaseCdkComponent } from './components/base-cdk/base-cdk.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgiwCoreUtilsModule } from 'ngiw-common/core-utils';
import { NgiwCoreUiModule } from 'ngiw-common/core-ui';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TableCdkComponent } from './components/table-cdk/table-cdk.component';



@NgModule({
  declarations: [  
    FormCdkComponent, BaseCdkComponent, TableCdkComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgiwCoreUtilsModule,
    NgiwCoreUiModule,
    NzFormModule,
    
    NzButtonModule,
    NzSelectModule,
    NzInputModule
  ],
  exports: [
    FormCdkComponent
  ]
})
export class NgiwCdkModule { }
