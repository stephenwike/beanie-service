export interface IBeaniePlayerEntity {
    name: string;
    isFirstDealer: boolean;
}

export class BeaniePlayerEntity implements IBeaniePlayerEntity {
    name: string;    
    isFirstDealer: boolean;

    constructor(init?: Partial<BeaniePlayerEntity>) {
        (<any>Object).assign(this, init);
    }
}