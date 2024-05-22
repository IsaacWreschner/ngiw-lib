import { NgModule } from '@angular/core';
import { FilterSorterComponent } from './components/table-ui-utils/filter-sorter/filter-sorter/filter-sorter.component';
import { NgiwCoreUtilsModule } from 'ngiw-common/core-utils'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

/** material */ 
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/** cdk  */


/**nz zorro */
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';


import { TranslationPipe } from 'ngiw-common/core-utils';
import { HeaderCellComponent } from './components/table/header/header-cell/header-cell.component';
import { SingleSelectComponent } from './components/select/single-select/single-select.component';
import { TableComponent } from './components/table/table.component';
import { VirtualScrollingXDirective } from './directives/table-directives/virtual-scrolling-x.directive';
import { StrechTableDirective } from './directives/table-directives/strech-table.directive';
import { ResizableDirective } from './directives/table-directives/resizable/resizable.directive';
import { VirtualScrollingYDirective } from './directives/table-directives/virtual-scrolling-y.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextPrettifyComponent } from './components/pretify/text-prettify/text-prettify.component';
import { MultiSelectComponent } from './components/select/multiselect/multiselect.component';
import { FileUploadComponent } from './components/upload/file-upload/file-upload.component';
import { MarkdownComponent } from './components/pretify/markdown/markdown.component';



@NgModule({
  declarations: [
    FilterSorterComponent,
    HeaderCellComponent,
    MultiSelectComponent,
    SingleSelectComponent,
    TableComponent,
    VirtualScrollingXDirective,
    VirtualScrollingYDirective,
    StrechTableDirective,
    ResizableDirective,
    TextPrettifyComponent,
    FileUploadComponent,
    MarkdownComponent

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgiwCoreUtilsModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NzRadioModule,
    MatFormFieldModule,
    NzButtonModule,
    NzPopoverModule,
    MatInputModule,
    NzInputModule,
    NzCascaderModule,
    OverlayModule,
    NzBackTopModule,
    MatProgressBarModule,
    NzSelectModule,
    NzDividerModule,
    NzIconModule,
    NzCheckboxModule,
    NzUploadModule,
    NzModalModule
  ],
  exports: [
    FilterSorterComponent,
    HeaderCellComponent,
    MultiSelectComponent,
    SingleSelectComponent,
    FileUploadComponent,
    TableComponent,
    MarkdownComponent
  ],
  providers: [TranslationPipe]
})
export class NgiwCoreUiModule { }
