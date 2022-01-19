import { Item, items } from "./crafting";
import { FruitItem, FRUITS, Fruit } from "./fruits";

export { Fruit };

export enum Charity {
  hz = "0x060697E9d4EEa886EbeCe57A974Facd53A40865B",
  shew = "0xD3F81260a44A1df7A7269CF66Abd9c7e4f8CdcD1"
}

export interface Donation {
  charity: Charity;
  value: string;
}
export interface Square {
  fruit: Fruit;
  createdAt: number;
}

export interface Transaction {
  fruit: Fruit;
  createdAt: number;
  action: Action;
  landIndex: number;
}

export enum Action {
  Plant = 0,
  Harvest = 1,
}

export type ActionableItem = FruitItem | Item;

export function isFruit(item: ActionableItem): item is FruitItem {
  return !(item as Item).address;
}

export const ACTIONABLE_ITEMS = [...FRUITS, ...items];
