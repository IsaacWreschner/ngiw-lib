export type Filter = {
    prop: string | string[];
    key: string | number | boolean | string[] | number[] | boolean[],
    excludeEmptyValues?: boolean,
    cast?:boolean
    method: {
        name: 'exactmatch' | 'contain' | 'custom';
        func?:(row:any) => boolean
    }
}

export type FilterGroup = {
    filters: Filter[],
    groupMethod: 'match-one' | 'match-all'
}