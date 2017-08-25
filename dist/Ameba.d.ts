import * as Rx from 'rxjs';
export default class Ameba<S extends Object> {
    private _entity;
    private _valueChanges;
    constructor(obj?: S);
    readonly props: S;
    readonly keys: string[];
    readonly valueChanges: Rx.Subject<any>;
    copy(): Ameba<S>;
    private _copy(value);
    private _copyObject(object);
    private _copyArray(arr);
    private _emit(val);
    static create<T>(obj?: T): Ameba<T>;
    static createBody<T>(obj?: T): T;
}
