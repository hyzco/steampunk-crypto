import { Item, items } from "./crafting";
import { FruitItem, FRUITS, Fruit } from "./fruits";

export { Fruit };

export enum Charity {
  payment = "0xE9700cc97cB607C73C37B416Ce18c375D0Df8F3d",
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
