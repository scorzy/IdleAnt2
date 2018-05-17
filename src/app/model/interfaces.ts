export interface Base {
    id: string;
    name: string;
    description: string;
    quantity: Decimal;

    getSave(): any;
    restore(data: any): boolean;
}
export interface Unlocable {
    unlocked: boolean;
    unlock(): boolean;
    onUnlock(): boolean;
}
export interface Buyable {
    bought: Decimal;
    buy(numer: Decimal): boolean;
}
