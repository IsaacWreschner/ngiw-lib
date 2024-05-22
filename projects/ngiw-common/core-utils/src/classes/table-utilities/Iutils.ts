import { BehaviorSubject, Subject } from "rxjs";

export interface IUtils {
    setData:(data:any) => any,
    $data:Subject<any[]> | BehaviorSubject<any[]>,
} 
