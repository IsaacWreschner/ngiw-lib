export type BaseCdkModel = {
    events?: { [key:string]: (event: any, ...args:any[]) => void};
    state?: { [key:string]: (event: any, ...args:any[]) => void};
}