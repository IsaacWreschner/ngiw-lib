import { Component, Input } from '@angular/core';
import { BaseCdkComponent } from '../base-cdk/base-cdk.component';
import { TableCdkModel } from '../../models/table-cdk.model';


@Component({
  selector: 'ngiw-table-cdk',
  templateUrl: './table-cdk.component.html',
  styleUrls: ['./table-cdk.component.css']
})
export class TableCdkComponent<Table> extends BaseCdkComponent {
  @Input() override model:TableCdkModel<Table> = {} as TableCdkModel<Table>;
}
