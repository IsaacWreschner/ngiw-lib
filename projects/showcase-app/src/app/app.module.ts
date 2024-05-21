import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { he_IL } from 'ng-zorro-antd/i18n';

import { NgiwCoreUiModule } from 'dist/ngiw-core-ui';  
import { NgiwCoreUtilsModule} from 'dist/ngiw-core-utils';


@NgModule({ 
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgiwCoreUiModule,
    NgiwCoreUtilsModule,
    BrowserModule,
    AppRoutingModule,
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
    NzModalModule 
  ],
  providers: [
    { provide: NZ_I18N, useValue: he_IL } 
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }