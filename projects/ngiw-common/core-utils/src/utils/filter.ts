/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter, FilterGroup } from "./filter.model";

/*export const filterData = (data:any, filters:FilterGroup) => {
     
}*/

const filterRows = (rows: any[], filter: Filter, updatedProp?:string) => {
     return rows.filter(row => scanRow(row, filter, updatedProp));
}

const scanRow = (row: any, filter: Filter, prop?:any):boolean => {
    const { key }  = filter;
    const hasMultiplesKeys = Array.isArray(key);
    const hasMultiplesProps = Array.isArray(prop);

    if (filter.method.name === 'custom') {
        return true;
    }

    if (hasMultiplesProps) {
        return scanRowWithMultiplesProps(row, filter, prop);
    }

    if (prop.includes('.')) {
        const {node, nodesProps} = splitProp(prop);
        return scanAndFilterChild(row[node as string], filter, nodesProps);
    }

    const value = row[prop];
    return hasMultiplesKeys ? scanValues(value, key, filter.method.name): scanValue(value, key, filter.method.name); 
    
}

const scanAndFilterChild = (data: any, filter:Filter, prop:string):boolean => {
        const typeOfChild = getTypeOfObject(data);
        if (typeOfChild === 'dict') {    
            return scanRow(data, filter, prop);
        }
        if (typeOfChild === 'array') {
            data = filterRows(data, filter, prop);
            return data.length > 0;
        }
        return true;
}

const scanValues = (values: any, key:any, method: any): boolean => {
    return values.filter((value:any) => scanValue(value, key, method)).length > 0;
}

const scanValue = (value:any, key:any, method: any): boolean => {
    switch (method) {
        case 'exactmatch': return matchExact(value, key)
        case 'contain': return contains(value, key)
        default: return false;
    } 
}

const scanValueWithMultiplesKeys = (value:any, keys:any[], method: any): boolean => {
    return keys.filter(key => scanValue(value, key, method)).length > 0;
}

const scanRowWithMultiplesProps = (row:any, filter:Filter, props:any[]): boolean => {
    return props.filter(prop => scanRow(row, filter, prop)).length > 0;
}

const matchExact = (value:any, key: any):boolean => {
    return (!key && key != 0) || value === key;
}

const contains = (value:any, key: any):boolean => {
        return (!key && key != 0) || value.includes(key);
}

const getTypeOfObject = (object: object): 'dict' | 'array'| 'none' => {
    if (Array.isArray(object)) {
        return 'array';
    }
    if (typeof object === 'object') {
        return 'dict';
    }
    return 'none'
}

const splitProp = (prop: string) => {
    const splitted:string[] = prop.split('.')
    return {
        node: splitted.shift(),
        nodesProps: splitted.join('.')
    }
}