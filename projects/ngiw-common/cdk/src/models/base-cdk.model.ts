export type BaseCdkModel = {
    events: { [key:string]: (event: any) => void};
}