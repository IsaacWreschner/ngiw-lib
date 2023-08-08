import { NgModule } from '@angular/core';
import { FilterSorterComponent } from './components/table-ui-utils/filter-sorter/filter-sorter/filter-sorter.component';
import { NgiwCoreUtilsModule } from 'ngiw-core-utils';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import he from '@angular/common/locales/he';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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


import { TranslationPipe } from 'ngiw-core-utils';
import { HeaderCellComponent } from './components/table/header/header-cell/header-cell.component';
import { TreeSelectComponent } from './components/select/tree-select/tree-select.component';
import { SingleSelectComponent } from './components/select/single-select/single-select.component';
import { TableComponent } from './components/table/table.component';
import { VirtualScrollingXDirective } from './directives/table-directives/virtual-scrolling-x.directive';
import { StrechTableDirective } from './directives/table-directives/strech-table.directive';
import { ResizableDirective } from './directives/table-directives/resizable/resizable.directive';
import { VirtualScrollingYDirective } from './directives/table-directives/virtual-scrolling-y.directive';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    FilterSorterComponent,
    HeaderCellComponent,
    TreeSelectComponent,
    SingleSelectComponent,
    TableComponent,
    VirtualScrollingXDirective,
    VirtualScrollingYDirective,
    StrechTableDirective,
    ResizableDirective
  
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
    NzSelectModule
  ],
  exports: [
    FilterSorterComponent,
    HeaderCellComponent,
    TreeSelectComponent,
    TableComponent
  ],
  providers: [TranslationPipe]
})
export class NgiwCoreUiModule { }
