
export interface callackOneParameter<T1,T2 = any> {
    (param1: T1): T2;
}

export interface callbackTwoParameters<T1,T2, T3 = any> {
    (param1: T1, param2: T2): T2;
}

export interface callbackNoParameters<T1 = any> {
    (): T1;
}