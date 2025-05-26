/* eslint-disable @typescript-eslint/no-explicit-any */
import { Signal, TemplateRef } from "@angular/core";
import { BaseCdkModel } from "./base-cdk.model";

export interface TableCdkModel<RowModel> extends BaseCdkModel {
    $source: any;
    $freeSearchPattern: any;
    freeSearchProps: string[];
    virtualProps: { [key: string]: (row: RowModel) => any };
    asyncVirtualProps: { [key: string]: (row: RowModel) => Promise<any> };
    firstColumn: any;
    groupBy?: string;
    showFilterInHeader?: boolean;
    columns: ColumnCdkModel<RowModel>[];
    state?: {
        
        $rowsAmount: Signal<number> 
        $data: Signal<RowModel[]> 
       /* $rowsAmount: (amount: number) => void;
        $data: (data: RowModel[], event: {
            row: RowModel;
            prop: keyof RowModel;
            newValue: any;
        }) => void;*/
    };
    api: any;
}

export interface ColumnCdkModel<RowModel> {
    headerName: string;
    prop: keyof RowModel;
    style: {
        width: string;
    };
    showFilterInHeader?: boolean;
    editable?: boolean;
    editSettings?: EditSettings;
    layout?: LayoutSettings;
    displaySettings?: DisplaySettings;
}

export interface EditSettings {
    validator: (input: any) => boolean;
}

export interface LayoutSettings {
    popover: {
        onInit: (row: any, col: any) => void;
        title: string;
        contentTmpl: TemplateRef<any>;
    };
}

export interface DisplaySettings {
    type: string;
    markdownSettings: {
        markdown: (data: any) => string;
    };
}

