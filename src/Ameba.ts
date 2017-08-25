import * as Rx from 'rxjs';

export default class Ameba<S extends Object> {

  private _entity: S;
  private _valueChanges: Rx.Subject<any> = new Rx.Subject();

  constructor(obj?: S) {
    const self = this;
    const entitier = {
      get: function<T>(target: S, name: string): S {
        return name in target ? target[name] : undefined;
      },
      set: function<T>(target: S, prop: string, value: T): boolean {
        target[prop] = value;
        self._emit(value);
        return true;
      }
    };

    obj = obj || <S>{};
    this._entity = new Proxy<S>(obj, entitier);
  }

  get props(): S {
    return this._entity;
  }

  get keys(): string[] {
    return Object.getOwnPropertyNames(this._entity);
  }

  get valueChanges(): Rx.Subject<any> {
    return this._valueChanges;
  }

  copy(): Ameba<S> {
    const entity: S = <S>{};
    for (let key of this.keys) {
      entity[key] = this._copy(this._entity[key]);
    }
    return new Ameba<S>(entity);
  }

  private _copy(value: any): any {
    if (Array.isArray(value)) {
      value = this._copyArray(value);
    } else if (typeof value === 'object') {
      value = this._copyObject(value);
    }
    return value;
  }

  private _copyObject(object: Object): Object {
    const entity: Object = {};
    for (let key in object) {
      entity[key] = this._copy(object[key]);
    }
    return entity;
  }

  private _copyArray(arr: Array<any>): Array<any> {
    const entity: Array<any> = [];
    for (let value of arr) {
      entity.push(this._copy(value));
    }
    return entity;
  }

  private _emit(val: any) {
    this._valueChanges.next(val);
  }

  static create<T>(obj?: T): Ameba<T> {
    return new Ameba<T>(obj);
  }

  static createBody<T>(obj?: T): T {
    return (new Ameba<T>(obj)).props;
  }
}
